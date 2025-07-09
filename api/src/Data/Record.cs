using System;

namespace api.Data
{
    public class Record
    {
        public int Day { get; set; }
        public int Month { get; set; }

        public string Saint { get; set; } = string.Empty;
        public string Saying { get; set; } = string.Empty;
    }
}
