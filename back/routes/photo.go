package routes

import (
	"net/http"
	"path/filepath"
	"github.com/gin-gonic/gin"
	"github.com/try_2_backend/models"
	"gorm.io/gorm"
	"time"
	"strconv"
	"github.com/matoous/go-nanoid/v2" // Для генерации UUID
	"mime/multipart"
)

// Проверяем MIME-тип файла, чтобы убедиться, что это изображение
func isImageFile(fileHeader *multipart.FileHeader) bool {
	allowedTypes := []string{"image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/tiff"}

	file, err := fileHeader.Open()
	if err != nil {
		return false
	}
	defer file.Close()

	buff := make([]byte, 512)
	file.Read(buff)
	filetype := http.DetectContentType(buff)

	for _, allowed := range allowedTypes {
		if filetype == allowed {
			return true
		}
	}
	return false
}

// Регистрация маршрутов для фотографий
func RegisterPhotoRoutes(r *gin.Engine, db *gorm.DB) {
	r.POST("/gallery/:id/photo", func(c *gin.Context) {
		galleryIDStr := c.Param("id")

		// Конвертируем galleryID из строки в int
		galleryID, err := strconv.Atoi(galleryIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid gallery ID"})
			return
		}

		// Получаем файл из запроса
		file, err := c.FormFile("photo")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
			return
		}

		// Проверяем MIME-тип
		if !isImageFile(file) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Only image files are allowed"})
			return
		}

		// Генерируем UUID для файла
		uuid, err := gonanoid.New()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to generate unique ID"})
			return
		}

		// Получаем оригинальное имя файла
		originalFilename := filepath.Base(file.Filename)
		// Задаем путь для сохранения с использованием UUID
		savePath := filepath.Join("uploads", uuid + filepath.Ext(originalFilename))

		// Сохраняем файл на сервере
		if err := c.SaveUploadedFile(file, savePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save the file"})
			return
		}

		// Добавляем запись в базу данных
		photo := models.Photo{
			GalleryID:    galleryID,
			UUID:         uuid + filepath.Ext(originalFilename), // Сохраняем UUID с расширением файла
			OriginalName: originalFilename,                       // Сохраняем оригинальное имя файла
			UploadedAt:   time.Now(),
		}

		if err := db.Create(&photo).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save photo data to the database"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully", "uuid": photo.UUID})
	})

	// Получаем фотографии по ID галереи
	r.GET("/gallery/:id/photos", func(c *gin.Context) {
		galleryIDStr := c.Param("id")

		// Конвертируем galleryID из строки в int
		galleryID, err := strconv.Atoi(galleryIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid gallery ID"})
			return
		}

		var photos []models.Photo
		if err := db.Where("gallery_id = ?", galleryID).Find(&photos).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve photos"})
			return
		}

		// Возвращаем список фотографий без изменения пути, фронтенд сам формирует полный путь
		c.JSON(http.StatusOK, photos)
	})
}
