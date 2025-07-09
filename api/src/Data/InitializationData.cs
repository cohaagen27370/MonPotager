using api.Attributes;
using api.Data.Entities;
using api.Data.Entities.Auth;
using api.Data.Entities.Catalog;
using api.Data.Entities.ClimateDatas;
using api.Data.Entities.Messaging;
using api.Data.Entities.Repositories;
using api.Data.Entities.StocksManaging;
using api.Data.Entities.Workflow;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public static class InitializationData
{
    private static readonly string[] OceanicDepartments =
        ["62", "80", "76", "27", "14", "61", "50", "29", "22", "56", "35", "53", "44", "85", "17", "33", "40", "64"];

    private static readonly string[] ContinentalDepartments =
        ["08", "55", "54", "57", "67", "68", "51", "10", "89", "58", "03", "42", "69", "71", "21", "70", "52"];

    private static readonly string[] MountainDepartments =
    [
        "88", "65", "09", "66", "31", "64", "81", "12", "15", "48", "63", "43", "25", "39", "01", "74", "73", "38",
        "05", "04"
    ];

    private static readonly string[] MediteraneanDepartments =
        ["66", "11", "34", "30", "07", "26", "84", "13", "83", "06", "2A", "2B"];

    private static readonly string[] TropicalDepartments = ["971", "972", "974", "976", "974"];
    private static readonly string[] EquatorialDepartments = ["973"];

    public static async Task Initialize(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider.GetRequiredService<GardenContext>;
        var context = services.Invoke();

        //await context.Database.EnsureDeletedAsync();
        //await context.Database.EnsureCreatedAsync();


        #region Climates

        if (!await context.Climates.AnyAsync())
        {
            var climates = new List<Climate>
            {
                new()
                {
                    Id = 1,
                    Label = "Océanique",
                    Image = "climat-oceanique",
                    Comment =
                        "Il concerne les régions proches de l'Altlantique et des côtes de la Manche donc entre Nouvelle-Aquitaine, nord Midi-Pyrénées, Bretagne, Normandie et l'ouest des Hauts-De-France. On y observe généralement de faibles amplitudes thermiques entre la température minimale et maximale. Il y a fait relativement doux et humide l'hiver, doux et plutôt sec l'été pour les côtes de la Manche, chaud et assez humide pour la côte Atlantique. Les intersaisons y sont très changeantes notamment près des côtes de la Manche où l'on peut y observer orage, neige, tempête, fortes pluies, etc. En raison de son positionnement géographique, la côte Atlantique bénéficie d'un temps un peu moins variable que les régions plus au nord durant le printemps et l'automne, par ailleurs le temps y est plus doux l'hiver et plus chaud l'été. Les précipitations sont quant à elles assez importantes, notamment durant les mois hivernaux. Niveau ensoleillement, on observe des disparités avec plus de soleil pour l'ouest de la Nouvelle-Aquitaine et Centre que pour le Nord-Ouest et les côtes de la Manche."
                },
                new()
                {
                    Id = 2,
                    Label = "Tempéré",
                    Image = "climat-degrade",
                    Comment =
                        "Il s'inscrit comme étant une sous-catégorie du climat océanique avec une touche un peu plus continentale, il affecte les régions s'étirant du centre de la France et à l'intérieur des Hauts-De-France en passant par le Bassin parisien. Pour le nord de cette zone, les hivers peuvent être parfois assez froids avec des gelées marquées, moins au sud de cette zone. Durant l'été, il y fait chaud et l'activité orageuse peut être notable, débordant parfois au début de l'automne et fin du printemps. Les intersaisons y sont assez clémentes mais peuvent parfois être rudes (froid tardif, chaleur tardive...). Globalement les précipitations tombent beaucoup moins que dans un climat océanique classique, elles sont constantes et tombent sous forme d'orage l'été et de bonnes pluies l'hiver. Pour finir, l'ensoleillement est plus élevé au sud de la zone qu'au nord (région parisienne, Est des Hauts-De-France...)."
                },
                new()
                {
                    Id = 3,
                    Label = "Montagnard",
                    Image = "climat-montagnard",
                    Comment =
                        "Le climat montagnard possède quelques similitudes avec le climat semi-continental puisque les hivers y sont assez rudes. Il sévit sur les zones montagneuses telles que les Pyrénées, les Alpes, le Massif-Central, le Jura, Vosges et la montagne corse. En hiver les chutes de neige sont fréquentes et abondantes et le mercure peut descendre bien bas, parfois en dessous des -20°C. Il peut neiger du milieu de l'automne à la moitié/fin du printemps (cela varie en fonction de l'altitude). En été, les orages sont très fréquents (presque journaliers), les températures sont plutôt clémentes en altitude mais les vallées peuvent devenir de vraies fournaises, c'est ce que l'on appelle des trous à chaud (TAC). De la même manière, lors d'inversions thermiques, les vallées peuvent se transformer en 'congélateur', c'est à dire des trous à froid ou TAF."
                },
                new()
                {
                    Id = 4,
                    Label = "Méditérranéen",
                    Image = "climat-mediteranneen",
                    Comment =
                        "Le climat méditerranéen est assez particulier. En effet, il garantit des étés chauds et très secs et des hivers doux et parfois très humides avec ce que l'on appelle des épisodes méditerranéens (EM). Cependant, la saison la plus intéressante est l'automne mais elle est aussi la plus dangereuse. En effet, de fréquents épisodes méditerranéens s'y produisent par vent de sud (lorsque le vent de sud souffle il ramène l'air doux et très humide vers les terres où l'air est plus frais et plus sec, ce qui crée un conflit de masse d'air générant de fortes pluies surtout près des Cévennes avec les fameux épisodes cévenols) ce qui a pour conséquence de donner d'importants cumuls de précipitation pendant l'automne et parfois même jusqu'en hiver. Durant le printemps, le temps se calme un peu malgré la persistance d'un risque d'épisode méditerranéen, notamment en début de période. Il est à noter que les régions méditerranéennes demeurent parmi les plus sèches du territoire mais aussi les plus ensoleillées"
                },
                new()
                {
                    Id = 5,
                    Label = "Continental",
                    Image = "climat-continental",
                    Comment =
                        "Les régions du nord-est de la France sont exposées à ce climat assez rude. A l'image du climat continental traditionnel, les étés y sont chauds et les hivers rudes, par ailleurs le cumul annuel des précipitations n'est pas très élevé mais surtout aléatoire en raison des reliefs environnants. On note cependant une touche un peu plus océanique que dans le cas du climat continental, c'est pourquoi nous l'appelons climat semi-continental. En allant plus dans les détails, nous pouvons remarquer certaines choses. Tout d'abord commençons avec l'hiver, il est plus froid que sur le reste de la France, les gelées y sont en général très fréquentes et parfois fortes, la neige y tombe assez régulièrement (sauf évidemment ces trois dernières années où les hivers doux n'ont laissé que peu de place aux coulées froides...). Durant le printemps on remarque de forts écarts de températures entre le matin et l'après-midi (parfois 20°C voire plus !), les premiers orages naissent vers fin mars/début avril. Pour ce qui est de l'autre intersaison, l'automne, les températures restent clémentes durant le mois de septembre mais elles commencent à baisser dès octobre si bien qu'il n'est pas rare d'y observer de la neige dès la mi-novembre, en particulier près des Ardennes. Enfin, les étés y sont chauds et fréquemment orageux, surtout à proximité des reliefs."
                },
                new()
                {
                    Id = 6,
                    Label = "Tropical",
                    Image = "climat-tropical",
                    Comment =
                        "Un climat tropical se caractérise par des températures élevées tout au long de l'année, avec des moyennes mensuelles souvent supérieures à 18°C. Les climats tropicaux se trouvent généralement entre les tropiques du Cancer et du Capricorne, dans une zone géographique proche de l'équateur."
                },
                new()
                {
                    Id = 7,
                    Label = "Equatorial",
                    Image = "climat-equatorial",
                    Comment =
                        "Un climat équatorial est un type de climat tropical qui se caractérise par des températures élevées et relativement constantes tout au long de l'année, ainsi que par des précipitations abondantes et régulières."
                }
            };

            await context.Climates.AddRangeAsync(climates);
            await context.SaveChangesAsync();
        }

        #endregion Climates

        #region Stations

        if (!await context.Stations.AnyAsync())
        {
            var stations = File.ReadLines(Path.Combine("Data", "Brutes", "resultats.csv"));

            var oceanicClimat = await context.Climates.SingleAsync(x => x.Id == 1);
            var continentalClimat = await context.Climates.SingleAsync(x => x.Id == 5);
            var mountainClimat = await context.Climates.SingleAsync(x => x.Id == 3);
            var mediterraneanClimat = await context.Climates.SingleAsync(x => x.Id == 4);
            var tropicalClimat = await context.Climates.SingleAsync(x => x.Id == 6);
            var equatorialClimat = await context.Climates.SingleAsync(x => x.Id == 7);
            var temperateClimat = await context.Climates.SingleAsync(x => x.Id == 2);

            var stationsDb = new List<Station>();
            stations.ToList().ForEach(line =>
            {
                var datas = line.Split(";");

                if (datas[0] != "INSEE_CODE")
                {
                    var id = Guid.NewGuid();

                    if (!stationsDb.Any(x => x.Name == datas[1]))
                    {
                        var newStation = new Station
                        {
                            Id = id,
                            InseeCode = datas[0],
                            Name = datas[1],
                            Code = datas[2],
                            Latitude = Convert.ToDouble(datas[3].Replace(".", ",")),
                            Longitude = Convert.ToDouble(datas[4].Replace(".", ",")),
                            Altitude = Convert.ToInt32(datas[5]),
                            IsDepartment = Convert.ToInt32(datas[5]) == 0,
                            CreationDate = DateTime.Now,
                            UpdateDate = DateTime.Now
                        };
                        if (OceanicDepartments.Contains(datas[2]))
                            newStation.Climate = oceanicClimat;
                        else if (ContinentalDepartments.Contains(datas[2]))
                            newStation.Climate = continentalClimat;
                        else if (MountainDepartments.Contains(datas[2]))
                            newStation.Climate = mountainClimat;
                        else if (MediteraneanDepartments.Contains(datas[2]))
                            newStation.Climate = mediterraneanClimat;
                        else if (TropicalDepartments.Contains(datas[2]))
                            newStation.Climate = tropicalClimat;
                        else if (EquatorialDepartments.Contains(datas[2]))
                            newStation.Climate = equatorialClimat;
                        else
                            newStation.Climate = temperateClimat;
                        stationsDb.Add(newStation);
                    }
                }
            });
            await context.Stations.AddRangeAsync(stationsDb);
            await context.SaveChangesAsync();

            stations = File.ReadLines(Path.Combine("Data", "Brutes", "resultats.csv"));
            var mesuresDb = new List<PhysicalMeasurements>();
            stations.ToList().ForEach(line =>
            {
                var datas = line.Split(";");

                if (datas[0] != "INSEE_CODE")
                    mesuresDb.Add(new PhysicalMeasurements
                    {
                        Id = Guid.NewGuid(),
                        Month = Convert.ToInt32(datas[6]),
                        MaxTemperature = Convert.ToDecimal(datas[7].Replace(".", ",")),
                        MinTemperature = Convert.ToDecimal(datas[8].Replace(".", ",")),
                        AverageTemperature = Convert.ToDecimal(datas[9].Replace(".", ",")),
                        CreationDate = DateTime.Now,
                        UpdateDate = DateTime.Now,
                        Station = context.Stations.First(x => x.Name == datas[1])
                    });
            });
            await context.PhysicalMeasurements.AddRangeAsync(mesuresDb);
            await context.SaveChangesAsync();
        }

        #endregion Stations

        #region Users

        if (!context.Users.Any())
        {
            var user = new User
            {
                Name = "Marylise BRANCHU",
                Email = "marylise@gmail.com",
                Active = true,
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Id = Guid.NewGuid(),
                TypeUser = TypesUser.ADMINISTRATOR,
                Password = BCrypt.Net.BCrypt.HashPassword("test", 10),
                Station = await context.Stations.FirstAsync(x => x.Name.Equals("Louviers"))
            };
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            context.Users.Attach(user);
        }

        #endregion Users


        #region Categories

        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new()
                {
                    Id = 1,
                    Label = "légume",
                    Image = "vegetable"
                },
                new()
                {
                    Id = 2,
                    Label = "fruit",
                    Image = "fruit"
                },
                new()
                {
                    Id = 3,
                    Label = "préparation",
                    Image = "preparation"
                }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();

            categories.ForEach(categorie => context.Entry(categorie).State = EntityState.Detached);
        }

        #endregion Categories

        #region Stages

        var vegetableCategory = await context.Categories.SingleAsync(x => x.Id == 1);
        var fruitCategory = await context.Categories.SingleAsync(x => x.Id == 2);
        var preparationCategory = await context.Categories.SingleAsync(x => x.Id == 3);

        if (!await context.Stages.AnyAsync())
        {
            var stages = new List<Stage>
            {
                new()
                {
                    Id = 1,
                    Category = preparationCategory,
                    Label = "préparation",
                    IsMultiple = false,
                    Image = "making",
                    Rank = 1
                },
                new()
                {
                    Id = 2,
                    Category = preparationCategory,
                    Label = "mélange",
                    IsMultiple = true,
                    Image = "blending",
                    Rank = 2
                },
                new()
                {
                    Id = 3,
                    Category = preparationCategory,
                    Label = "récolte partielle",
                    IsMultiple = true,
                    Image = "harvesting",
                    Rank = 99
                },
                new()
                {
                    Id = 4,
                    Category = preparationCategory,
                    Label = "récolte totale",
                    IsMultiple = false,
                    Image = "harvesting",
                    Rank = 100
                },
                new()
                {
                    Id = 6,
                    Category = fruitCategory,
                    Label = "semis",
                    IsMultiple = false,
                    Image = "seeding",
                    Rank = 1
                },
                new()
                {
                    Id = 7,
                    Category = fruitCategory,
                    Label = "repiquage",
                    IsMultiple = false,
                    Image = "planting",
                    Rank = 2
                },
                new()
                {
                    Id = 8,
                    Category = fruitCategory,
                    Label = "fertilisation",
                    IsMultiple = true,
                    Image = "fertilizing",
                    Rank = 3
                },
                new()
                {
                    Id = 9,
                    Category = fruitCategory,
                    Label = "arrosage",
                    IsMultiple = true,
                    Image = "watering",
                    Rank = 4
                },
                new()
                {
                    Id = 10,
                    Category = fruitCategory,
                    Label = "taille",
                    IsMultiple = true,
                    Image = "cutting",
                    Rank = 5
                },
                new()
                {
                    Id = 11,
                    Category = fruitCategory,
                    Label = "récolte partielle",
                    IsMultiple = true,
                    Image = "harvesting",
                    Rank = 99
                },
                new()
                {
                    Id = 12,
                    Category = fruitCategory,
                    Label = "récolte totale",
                    IsMultiple = false,
                    Image = "harvesting",
                    Rank = 100
                },

                new()
                {
                    Id = 13,
                    Category = vegetableCategory,
                    Label = "semis",
                    IsMultiple = false,
                    Image = "seeding",
                    Rank = 1
                },
                new()
                {
                    Id = 14,
                    Category = vegetableCategory,
                    Label = "repiquage",
                    IsMultiple = false,
                    Image = "planting",
                    Rank = 2
                },
                new()
                {
                    Id = 15,
                    Category = vegetableCategory,
                    Label = "fertilisation",
                    IsMultiple = true,
                    Image = "fertilizing",
                    Rank = 3
                },
                new()
                {
                    Id = 16,
                    Category = vegetableCategory,
                    Label = "arrosage",
                    IsMultiple = true,
                    Image = "watering",
                    Rank = 4
                },
                new()
                {
                    Id = 17,
                    Category = vegetableCategory,
                    Label = "taille",
                    IsMultiple = true,
                    Image = "cutting",
                    Rank = 5
                },
                new()
                {
                    Id = 18,
                    Category = vegetableCategory,
                    Label = "compostage",
                    IsMultiple = true,
                    Image = "recycling",
                    Rank = 101
                },
                new()
                {
                    Id = 19,
                    Category = vegetableCategory,
                    Label = "récolte partielle",
                    IsMultiple = true,
                    Image = "harvesting",
                    Rank = 99
                },
                new()
                {
                    Id = 20,
                    Category = vegetableCategory,
                    Label = "récolte totale",
                    IsMultiple = false,
                    Image = "harvesting",
                    Rank = 100
                }
            };
            await context.Stages.AddRangeAsync(stages);
            await context.SaveChangesAsync();
        }

        #endregion Stages

        #region Families

        if (!context.Families.Any())
        {
            var families = new List<Family>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Haricot",
                        Image = "haricot"
                    },
                    Description = "blabla",
                    Category = vegetableCategory,
                    GerminationMinimalTemperature = 16,
                    GerminationOptimaleTemperature = 25,
                    IdealGrowingTemperature = 24,
                    ZeroVegetation = 11,
                    MinimalRisingTime = 6,
                    MaximumRisingTime = 8,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Carotte",
                        Image = "carotte"
                    },
                    Description = "blabla",
                    Category = vegetableCategory,
                    GerminationMinimalTemperature = 7,
                    GerminationOptimaleTemperature = 20,
                    IdealGrowingTemperature = 18,
                    ZeroVegetation = 9,
                    MinimalRisingTime = 10,
                    MaximumRisingTime = 15,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Concombre",
                        Image = "concombre"
                    },
                    Description = "blabla",
                    Category = vegetableCategory,
                    GerminationMinimalTemperature = 16,
                    GerminationOptimaleTemperature = 26,
                    IdealGrowingTemperature = 24,
                    ZeroVegetation = 15,
                    MinimalRisingTime = 8,
                    MaximumRisingTime = 10,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Purin",
                        Image = "purin"
                    },
                    Description = "blabla",
                    Category = vegetableCategory,
                    MinimalRisingTime = 21,
                    MaximumRisingTime = 30,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                }
            };
            await context.Families.AddRangeAsync(families);
            await context.SaveChangesAsync();
        }

        #endregion Families

        #region Varieties

        if (!context.Variants.Any())
        {
            var carotte = await context.Families.Where(c => c.Designation.Name == "Carotte").SingleAsync();
            var haricot = await context.Families.Where(c => c.Designation.Name == "Haricot").SingleAsync();
            var concombre = await context.Families.Where(c => c.Designation.Name == "Concombre").SingleAsync();
            var purin = await context.Families.Where(c => c.Designation.Name == "Purin").SingleAsync();

            var products = new List<Variant>
            {
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Crockett",
                        Image = "haricot-crockett"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MaxMaturationDaysCount = 50,
                    MinMaturationDaysCount = 70,
                    Family = haricot
                },
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Roi des beurres",
                        Image = "haricot-roi des beurres"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MinMaturationDaysCount = 50,
                    MaxMaturationDaysCount = 70,
                    Family = haricot
                },
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Skipper",
                        Image = "haricot-skipper"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MinMaturationDaysCount = 50,
                    MaxMaturationDaysCount = 70,
                    Family = haricot
                },
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Nantaise",
                        Image = "carotte-nantaise"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MinMaturationDaysCount = 90,
                    MaxMaturationDaysCount = 120,
                    Family = carotte
                },
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Marketer",
                        Image = "concombre-marketer"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MinMaturationDaysCount = 50,
                    MaxMaturationDaysCount = 70,
                    Family = concombre
                },
                new()
                {
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Designation = new Designation
                    {
                        Name = "Consoude",
                        Image = "purin-consoude"
                    },
                    SowingMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = true,
                        May = true,
                        June = true,
                        July = true,
                        August = false,
                        September = false,
                        October = false,
                        November = false,
                        December = false
                    },
                    HarvestMonths = new Sowing
                    {
                        January = false,
                        February = false,
                        March = false,
                        April = false,
                        May = false,
                        June = false,
                        July = false,
                        August = false,
                        September = true,
                        October = true,
                        November = true,
                        December = true
                    },
                    MinMaturationDaysCount = 15,
                    MaxMaturationDaysCount = 21,
                    Family = purin
                }
            };

            await context.Variants.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }

        #endregion Varieties

        var product1 = (await context.Variants.ToListAsync())[0];
        var product2 = (await context.Variants.ToListAsync()).Last();

        var stage1 = await context.Stages.Include(x => x.Category).SingleAsync(x => x.Category.Id == 1 && x.Rank == 1);
        var stage2 = await context.Stages.Include(x => x.Category).SingleAsync(x => x.Category.Id == 1 && x.Rank == 5);

        #region Flows

        if (!context.Flows.Any() && context.Users.Any())
        {
            var flows = new List<Flow>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    CurrentStage = stage1,
                    Variant = product1,
                    Year = DateTime.Now.Year,
                    IsClosed = false,
                    NumberOfDaysSinceStart = 0,
                    User = context.Users.First(),
                    Events =
                    [
                        new Event
                        {
                            Id = Guid.NewGuid(),
                            CreationDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(-2)),
                            Stage = stage1
                        }
                    ]
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    CurrentStage = stage1,
                    Variant = product2,
                    Year = DateTime.Now.Year,
                    IsClosed = false,
                    NumberOfDaysSinceStart = 0,
                    User = context.Users.First(),
                    Events =
                    [
                        new Event
                        {
                            Id = Guid.NewGuid(),
                            CreationDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(-1)),
                            Stage = stage1
                        },
                        new Event
                        {
                            Id = Guid.NewGuid(),
                            CreationDate = DateTime.Now,
                            UpdateDate = DateTime.Now,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-15)),
                            Stage = stage2
                        }
                    ]
                }
            };

            await context.Flows.AddRangeAsync(flows);
            await context.SaveChangesAsync();
        }

        #endregion Flows

        #region Messages

        if (!await context.Messages.AnyAsync())
        {
            var newMessages = new List<Message>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Image = "aguadulce.jpg",
                    Content = "<div><p>L'époque de semis des fèves commencent !<p>" +
                              "<a href='https://fr.wikipedia.org/wiki/F%C3%A8ve'>Wikipédia</a><div>"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now,
                    Image = "aubergine.jpg",
                    Content = "<div><p>Il est temps de semer vos aubergines sous abris<p>",
                    User = context.Users.First()
                }
            };
            await context.Messages.AddRangeAsync(newMessages);
            await context.SaveChangesAsync();
        }

        #endregion Messages

        #region Packages

        if (!context.Packages.Any())
        {
            context.ChangeTracker.Clear();
            var newPackages = new List<Package>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    ExpirationDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-2)),
                    PurchaseDate = DateOnly.FromDateTime(DateTime.Now),
                    RemainingQuantity = 1,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    ExpirationDate = DateOnly.FromDateTime(DateTime.Now.AddYears(1)),
                    PurchaseDate = DateOnly.FromDateTime(DateTime.Now.AddMonths(-5)),
                    RemainingQuantity = 0.25m,
                    CreationDate = DateTime.Now,
                    UpdateDate = DateTime.Now
                }
            };

            var variant1 = await context.Variants.Include(x => x.Family).SingleAsync(x =>
                x.Family.Designation.Name == "Haricot" && x.Designation.Name == "Crockett");
            var newStock = new Stock
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Packages = newPackages,
                Variant = variant1,
                User = await context.Users.FirstAsync()
            };
            await context.Stocks.AddAsync(newStock);

            var newPackagesOther = new List<Package>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    ExpirationDate = DateOnly.FromDateTime(DateTime.Now.AddYears(2)),
                    PurchaseDate = DateOnly.FromDateTime(DateTime.Now),
                    RemainingQuantity = 1
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    ExpirationDate = DateOnly.FromDateTime(DateTime.Now.AddYears(1)),
                    PurchaseDate = DateOnly.FromDateTime(DateTime.Now.AddMonths(-5)),
                    RemainingQuantity = 1
                }
            };

            var variant2 = await context.Variants.Include(x => x.Family).SingleAsync(x =>
                x.Family.Designation.Name == "Carotte" && x.Designation.Name == "Nantaise");
            var newStockOther = new Stock
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Packages = newPackagesOther,
                Variant = variant2,
                User = await context.Users.FirstAsync()
            };
            await context.Stocks.AddAsync(newStockOther);

            var variant3 = await context.Variants.Include(x => x.Family).SingleAsync(x =>
                x.Family.Designation.Name == "Concombre" && x.Designation.Name == "Marketer");
            var newStockTwice = new Stock
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Packages = [],
                Variant = variant3,
                User = await context.Users.FirstAsync()
            };
            await context.Stocks.AddAsync(newStockTwice);
            await context.SaveChangesAsync();
        }

        #endregion Packages
    }
}