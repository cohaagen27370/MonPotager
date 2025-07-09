namespace api.Extensions
{
    public static class HttpContextExtensions
    {
        public static Guid Me(this HttpContext httpContext)
        {
            if (httpContext.Items.ContainsKey("userId"))
            {
                string? valeur = httpContext.Items["userId"]?.ToString();

                if (valeur != null)
                {
                    return Guid.Parse(valeur);
                }
            }

            return Guid.Empty;
        }
    }
}
