import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	console.log("Middleware is running") // Убедитесь, что middleware запускается

	const { pathname } = request.nextUrl
	const protectedRoutes = ["/gallery"]

	if (protectedRoutes.includes(pathname)) {
		const cookiesHeader = request.headers.get("cookie")
		console.log(`Cookies header: ${cookiesHeader}`) // Проверьте, что заголовок куков получен

		// Извлечение токена из заголовка куков
		const cookies = cookiesHeader
			? Object.fromEntries(
					cookiesHeader.split("; ").map((cookie) => {
						const [key, value] = cookie.split("=")
						return [key, value]
					})
			  )
			: {}

		const token = cookies["jwt"]

		if (!token) {
			// Если токен отсутствует, перенаправляем на страницу логина
			return NextResponse.redirect(new URL("/photographer", request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/gallery"], // Middleware применяется только к маршруту /gallery
}
