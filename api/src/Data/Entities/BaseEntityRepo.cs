namespace api.Data.Entities
{

    public abstract class BaseEntityRepo : BaseEntitySimple
    {
        public string Label { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
