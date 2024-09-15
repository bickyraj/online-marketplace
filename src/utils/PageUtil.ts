class PageUtil {
    public static pathToTitle = (url: URL): String => {
        // Extract the path segment after the last '/'
        const path: String | undefined = new URL(url).pathname.split('/').pop();

        // Convert path to title case
        const title = path?.split('-') // Split by hyphens
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join with spaces

        return title ?? "";
    }
}
export default PageUtil;