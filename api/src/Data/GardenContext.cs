using api.Data.Entities.Auth;
using api.Data.Entities.Catalog;
using api.Data.Entities.ClimateDatas;
using api.Data.Entities.Messaging;
using api.Data.Entities.Repositories;
using api.Data.Entities.StocksManaging;
using api.Data.Entities.Workflow;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class GardenContext(DbContextOptions<GardenContext> options) : DbContext(options)
{

    public virtual required DbSet<Email> Emails { get; set; }
    public virtual required DbSet<Message> Messages { get; set; }
    public virtual required DbSet<Captcha> Captchas { get; set; }
    public virtual required DbSet<Climate> Climates { get; set; }
    public virtual required DbSet<Station> Stations { get; set; }
    public virtual required DbSet<PhysicalMeasurements> PhysicalMeasurements { get; set; }
    public virtual required DbSet<Family> Families { get; set; }
    public virtual required DbSet<Variant> Variants { get; set; }
    public virtual required DbSet<Package> Packages { get; set; }
    public virtual required DbSet<Stock> Stocks { get; set; }
    public virtual required DbSet<Flow> Flows { get; set; }
    public virtual required DbSet<Event> Events { get; set; }
    public virtual required DbSet<User> Users { get; set; }
    public virtual required DbSet<Stage> Stages { get; set; }
    public virtual required DbSet<Category> Categories { get; set; }
    public virtual required DbSet<Search> Searches { get; set; }
    
}