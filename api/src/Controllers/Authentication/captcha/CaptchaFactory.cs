using System;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace api.Controllers.Authentication.captcha;

public class CaptchaFactory
{
    private readonly string[] PossibleValues = ["1","2","3","4","5","6","7","8","9","0","@","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    private readonly int[] positions = [33, 48, 64, 80, 96, 112];

    public CaptchaData Create()
    {
        Image image = new Image<Rgba32>(150, 50);
        image.Mutate(x => x.Fill(Color.White, new RectangleF(0, 0, 150, 50)));
        MemoryStream stream = new();

        var captcha = new CaptchaData();

        for (int index = 0; index < 6; index++)
        {
            var value = this.PossibleValues[new Random().Next(PossibleValues.Length - 1)];

            var font = SystemFonts.CreateFont("Courier new", new Random().Next(18, 25), FontStyle.Bold);
            image.Mutate(x => x.DrawText(value, font, new SolidBrush(Color.Black), new PointF(this.positions[index], new Random().Next(0, 10))));

            captcha.Value += value;
        }
        image.Save(stream, new WebpEncoder());
        captcha.Image = stream.ToArray();

        return captcha;
    }
}
