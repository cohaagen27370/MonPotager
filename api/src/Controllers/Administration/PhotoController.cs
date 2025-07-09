using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Metadata;
using SixLabors.ImageSharp.Processing;

namespace api.Controllers.Administration;

[ApiController]
[Route("/v{version:apiVersion}/admin")]
public class PhotoController(
    ILogger<PhotoController> logger,
    IWebHostEnvironment env
) : ControllerBase
{
    private readonly IWebHostEnvironment _env = env;
    private readonly ILogger<PhotoController> _logger = logger;

    public static bool IsAnImage(IFormFile fichierPoste)
    {
        return !(
            !fichierPoste.ContentType.Equals("image/jpg", StringComparison.CurrentCultureIgnoreCase)
            && !fichierPoste.ContentType.Equals(
                "image/jpeg",
                StringComparison.CurrentCultureIgnoreCase
            )
            && !fichierPoste.ContentType.Equals(
                "image/pjpeg",
                StringComparison.CurrentCultureIgnoreCase
            )
            && !fichierPoste.ContentType.Equals(
                "image/gif",
                StringComparison.CurrentCultureIgnoreCase
            )
            && !fichierPoste.ContentType.Equals(
                "image/x-png",
                StringComparison.CurrentCultureIgnoreCase
            )
            && !fichierPoste.ContentType.Equals(
                "image/png",
                StringComparison.CurrentCultureIgnoreCase
            )
            && !fichierPoste.ContentType.Equals(
                "image/webp",
                StringComparison.CurrentCultureIgnoreCase
            )
        );
    }

    /// <summary>
    ///     Loading photo
    /// </summary>
    /// <param name="file">Photo file</param>
    /// <returns>the name</returns>
    [HttpPost("photo")]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Add(IFormFile file)
    {
        if (!IsAnImage(file)) return BadRequest("Bad file");

        var content = file.OpenReadStream();
        var nouvelle = await Image.LoadAsync(content);

        var name = Guid.NewGuid().ToString();

        await nouvelle.SaveAsJpegAsync(Path.Combine(_env.WebRootPath, "images", name.ToLower() + "_full.jpg"),
            new JpegEncoder());

        #region Ratio

        int localWidth, height;

        if (nouvelle.Width > nouvelle.Height)
        {
            localWidth = 100;
            height = Convert.ToInt32(nouvelle.Height * 100 / (double)nouvelle.Width);
        }
        else
        {
            localWidth = Convert.ToInt32(nouvelle.Width * 100 / (double)nouvelle.Height);
            height = 100;
        }

        #endregion Ratio

        nouvelle.Mutate(x => x.Resize(localWidth, height, true));
        nouvelle.Metadata.ResolutionUnits = PixelResolutionUnit.PixelsPerInch;
        nouvelle.Metadata.VerticalResolution = 300;
        nouvelle.Metadata.HorizontalResolution = 300;

        await nouvelle.SaveAsJpegAsync(Path.Combine(_env.WebRootPath, "images", name + ".jpg"),
            new JpegEncoder());

        return Ok(new { reference = name });
    }
}