package routes

import (
  "os"
  "path/filepath"
  "net/http"
  "strconv"
  "gorm.io/gorm"

  "github.com/gin-gonic/gin"
  "github.com/try_2_backend/models"
  "github.com/try_2_backend/database"
)

func RegisterGalleryRoutes(router *gin.Engine, db *database.DB) {
  router.GET("/galleries", func(ctx *gin.Context) {
    items, err := db.GetAllGalleries()
    if err != nil {
      ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
        "result": false,
        "error":  "database error",
      })
      return
    }

    ctx.JSON(http.StatusOK, gin.H{
      "result": true,
      "data":   items,
    })
  })

  router.POST("/galleries", func(ctx *gin.Context) {
    var gallery models.Gallery
    if err := ctx.ShouldBindJSON(&gallery); err != nil {
      ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
      return
    }

    if err := db.CreateGallery(&gallery); err != nil {
      ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create gallery"})
      return
    }

    ctx.JSON(http.StatusOK, gin.H{"result": true, "data": gallery})
  })

  router.DELETE("/galleries/:id", func(ctx *gin.Context) {
    idStr := ctx.Param("id")
    galleryID, err := strconv.Atoi(idStr)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid gallery ID"})
        return
    }

    // Найти все фотографии в галерее
    var photos []models.Photo
    if err := db.Where("gallery_id = ?", galleryID).Find(&photos).Error; err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve photos"})
        return
    }

    // Удалить файлы с сервера
    for _, photo := range photos {
        filePath := filepath.Join("../front/public/uploads", photo.UUID + photo.Extension)
        if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete photo file"})
            return
        }
    }

    // Удалить галерею и связанные фотографии из базы данных
    if err := db.Transaction(func(tx *gorm.DB) error {
        if err := tx.Delete(&models.Gallery{}, galleryID).Error; err != nil {
            return err
        }
        if err := tx.Where("gallery_id = ?", galleryID).Delete(&models.Photo{}).Error; err != nil {
            return err
        }
        return nil
    }); err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete gallery and photos from database"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "Gallery and associated photos deleted successfully"})
  })



  // Обработчик PUT-запросов для обновления информации о галерее
  router.PUT("/galleries/:id", func(ctx *gin.Context) {
    idStr := ctx.Param("id")
    var gallery models.Gallery
  
    // Преобразование строки в целое число
    id, err := strconv.Atoi(idStr)
    if err != nil {
      ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid gallery ID"})
      return
    }
  
    if err := ctx.ShouldBindJSON(&gallery); err != nil {
      ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
      return
    }
  
    // Устанавливаем ID из URL в объект галереи
    gallery.ID = id
  
    // Обновляем галерею в базе данных
    if err := db.UpdateGallery(&gallery); err != nil {
      ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update gallery"})
      return
    }
  
    ctx.JSON(http.StatusOK, gin.H{"result": true, "data": gallery})
  })
}