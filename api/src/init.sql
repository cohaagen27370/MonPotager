IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Captchas] (
        [Id] uniqueidentifier NOT NULL,
        [Value] nvarchar(max) NOT NULL,
        [IsActive] bit NOT NULL,
        [ActivationDate] datetime2 NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Captchas] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Categories] (
        [Id] int NOT NULL,
        [Label] nvarchar(max) NOT NULL,
        [Image] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Climates] (
        [Id] int NOT NULL,
        [Comment] nvarchar(max) NOT NULL,
        [Label] nvarchar(max) NOT NULL,
        [Image] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Climates] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Emails] (
        [Id] uniqueidentifier NOT NULL,
        [Address] nvarchar(max) NOT NULL,
        [SendingDate] datetime2 NOT NULL,
        [Subject] nvarchar(max) NOT NULL,
        [Content] varchar(max) NOT NULL,
        [Result] nvarchar(max) NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Emails] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Searches] (
        [Id] uniqueidentifier NOT NULL,
        [SearchDesignation_Name] varchar(150) NOT NULL,
        [SearchDesignation_Image] varchar(150) NOT NULL,
        [SearchCount] int NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Searches] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Families] (
        [Id] uniqueidentifier NOT NULL,
        [Designation_Name] varchar(150) NOT NULL,
        [Designation_Image] varchar(150) NOT NULL,
        [Description] varchar(max) NOT NULL,
        [CategoryId] int NOT NULL,
        [GerminationMinimalTemperature] decimal(18,2) NULL,
        [GerminationOptimaleTemperature] decimal(18,2) NULL,
        [MinimalRisingTime] int NULL,
        [MaximumRisingTime] int NULL,
        [IdealGrowingTemperature] decimal(18,2) NULL,
        [ZeroVegetation] decimal(18,2) NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Families] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Families_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Stages] (
        [Id] int NOT NULL,
        [Rank] int NOT NULL,
        [IsMultiple] bit NOT NULL,
        [CategoryId] int NOT NULL,
        [Label] nvarchar(max) NOT NULL,
        [Image] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Stages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Stages_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Stations] (
        [Id] uniqueidentifier NOT NULL,
        [Code] nvarchar(450) NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Tendency] nvarchar(max) NOT NULL,
        [Latitude] float NOT NULL,
        [Longitude] float NOT NULL,
        [Altitude] int NOT NULL,
        [IsDepartment] bit NOT NULL,
        [ClimateId] int NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Stations] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Stations_Climates_ClimateId] FOREIGN KEY ([ClimateId]) REFERENCES [Climates] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Variants] (
        [Id] uniqueidentifier NOT NULL,
        [Designation_Name] varchar(150) NOT NULL,
        [Designation_Image] varchar(150) NOT NULL,
        [SowingMonths_January] bit NOT NULL,
        [SowingMonths_February] bit NOT NULL,
        [SowingMonths_March] bit NOT NULL,
        [SowingMonths_April] bit NOT NULL,
        [SowingMonths_May] bit NOT NULL,
        [SowingMonths_June] bit NOT NULL,
        [SowingMonths_July] bit NOT NULL,
        [SowingMonths_August] bit NOT NULL,
        [SowingMonths_September] bit NOT NULL,
        [SowingMonths_October] bit NOT NULL,
        [SowingMonths_November] bit NOT NULL,
        [SowingMonths_December] bit NOT NULL,
        [HarvestMonths_January] bit NOT NULL,
        [HarvestMonths_February] bit NOT NULL,
        [HarvestMonths_March] bit NOT NULL,
        [HarvestMonths_April] bit NOT NULL,
        [HarvestMonths_May] bit NOT NULL,
        [HarvestMonths_June] bit NOT NULL,
        [HarvestMonths_July] bit NOT NULL,
        [HarvestMonths_August] bit NOT NULL,
        [HarvestMonths_September] bit NOT NULL,
        [HarvestMonths_October] bit NOT NULL,
        [HarvestMonths_November] bit NOT NULL,
        [HarvestMonths_December] bit NOT NULL,
        [MinMaturationDaysCount] int NOT NULL,
        [MaxMaturationDaysCount] int NOT NULL,
        [FamilyId] uniqueidentifier NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Variants] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Variants_Families_FamilyId] FOREIGN KEY ([FamilyId]) REFERENCES [Families] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [PhysicalMeasurements] (
        [Id] uniqueidentifier NOT NULL,
        [Month] int NOT NULL,
        [MaxTemperature] decimal(18,2) NOT NULL,
        [MinTemperature] decimal(18,2) NOT NULL,
        [AverageTemperature] decimal(18,2) NOT NULL,
        [StationId] uniqueidentifier NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_PhysicalMeasurements] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PhysicalMeasurements_Stations_StationId] FOREIGN KEY ([StationId]) REFERENCES [Stations] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Users] (
        [Id] uniqueidentifier NOT NULL,
        [Name] varchar(150) NOT NULL,
        [Email] varchar(255) NOT NULL,
        [Password] varchar(100) NOT NULL,
        [Active] bit NOT NULL,
        [ResetWord] varchar(20) NOT NULL,
        [ExpirationResetDate] datetime2 NULL,
        [TypeUser] int NOT NULL,
        [StationId] uniqueidentifier NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Users_Stations_StationId] FOREIGN KEY ([StationId]) REFERENCES [Stations] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Flows] (
        [Id] uniqueidentifier NOT NULL,
        [VariantId] uniqueidentifier NOT NULL,
        [CurrentStageId] int NOT NULL,
        [IsClosed] bit NOT NULL,
        [Year] int NOT NULL,
        [NumberOfDaysSinceStart] int NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Flows] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Flows_Stages_CurrentStageId] FOREIGN KEY ([CurrentStageId]) REFERENCES [Stages] ([Id]),
        CONSTRAINT [FK_Flows_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Flows_Variants_VariantId] FOREIGN KEY ([VariantId]) REFERENCES [Variants] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Messages] (
        [Id] uniqueidentifier NOT NULL,
        [Image] nvarchar(max) NOT NULL,
        [Content] nvarchar(max) NOT NULL,
        [UserId] uniqueidentifier NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Messages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Messages_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Stocks] (
        [Id] uniqueidentifier NOT NULL,
        [VariantId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Stocks] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Stocks_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Stocks_Variants_VariantId] FOREIGN KEY ([VariantId]) REFERENCES [Variants] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Events] (
        [Id] uniqueidentifier NOT NULL,
        [Date] date NOT NULL,
        [StageId] int NOT NULL,
        [FlowId] uniqueidentifier NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Events] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Events_Flows_FlowId] FOREIGN KEY ([FlowId]) REFERENCES [Flows] ([Id]),
        CONSTRAINT [FK_Events_Stages_StageId] FOREIGN KEY ([StageId]) REFERENCES [Stages] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE TABLE [Packages] (
        [Id] uniqueidentifier NOT NULL,
        [ExpirationDate] date NOT NULL,
        [RemainingQuantity] decimal(18,2) NOT NULL,
        [PurchaseDate] date NOT NULL,
        [StockId] uniqueidentifier NULL,
        [CreationDate] datetime2 NOT NULL,
        [UpdateDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Packages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Packages_Stocks_StockId] FOREIGN KEY ([StockId]) REFERENCES [Stocks] ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Captchas_CreationDate] ON [Captchas] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Captchas_Id] ON [Captchas] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Captchas_UpdateDate] ON [Captchas] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Categories_Id] ON [Categories] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Climates_Id] ON [Climates] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Emails_CreationDate] ON [Emails] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Emails_Id] ON [Emails] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Emails_UpdateDate] ON [Emails] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Events_CreationDate] ON [Events] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Events_Date] ON [Events] ([Date]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Events_FlowId] ON [Events] ([FlowId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Events_Id] ON [Events] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Events_StageId] ON [Events] ([StageId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Events_UpdateDate] ON [Events] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Families_CategoryId] ON [Families] ([CategoryId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Families_CreationDate] ON [Families] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Families_Designation_Name] ON [Families] ([Designation_Name]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Families_Id] ON [Families] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Families_UpdateDate] ON [Families] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_CreationDate] ON [Flows] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_CurrentStageId] ON [Flows] ([CurrentStageId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Flows_Id] ON [Flows] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_IsClosed] ON [Flows] ([IsClosed]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_UpdateDate] ON [Flows] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_UserId] ON [Flows] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Flows_VariantId] ON [Flows] ([VariantId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Messages_CreationDate] ON [Messages] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Messages_Id] ON [Messages] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Messages_UpdateDate] ON [Messages] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Messages_UserId] ON [Messages] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_CreationDate] ON [Packages] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_ExpirationDate] ON [Packages] ([ExpirationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Packages_Id] ON [Packages] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_PurchaseDate] ON [Packages] ([PurchaseDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_RemainingQuantity] ON [Packages] ([RemainingQuantity]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_StockId] ON [Packages] ([StockId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Packages_UpdateDate] ON [Packages] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_PhysicalMeasurements_CreationDate] ON [PhysicalMeasurements] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_PhysicalMeasurements_Id] ON [PhysicalMeasurements] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_PhysicalMeasurements_Month] ON [PhysicalMeasurements] ([Month]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_PhysicalMeasurements_StationId] ON [PhysicalMeasurements] ([StationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_PhysicalMeasurements_UpdateDate] ON [PhysicalMeasurements] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Searches_CreationDate] ON [Searches] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Searches_Id] ON [Searches] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Searches_SearchDesignation_Name] ON [Searches] ([SearchDesignation_Name]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Searches_UpdateDate] ON [Searches] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stages_CategoryId] ON [Stages] ([CategoryId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Stages_Id] ON [Stages] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stations_ClimateId] ON [Stations] ([ClimateId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stations_Code] ON [Stations] ([Code]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stations_CreationDate] ON [Stations] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Stations_Id] ON [Stations] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stations_IsDepartment] ON [Stations] ([IsDepartment]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stations_UpdateDate] ON [Stations] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stocks_CreationDate] ON [Stocks] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Stocks_Id] ON [Stocks] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stocks_UpdateDate] ON [Stocks] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stocks_UserId] ON [Stocks] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Stocks_VariantId] ON [Stocks] ([VariantId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Users_CreationDate] ON [Users] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Id] ON [Users] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Users_Name] ON [Users] ([Name]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Users_StationId] ON [Users] ([StationId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Users_UpdateDate] ON [Users] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Variants_CreationDate] ON [Variants] ([CreationDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Variants_Designation_Name] ON [Variants] ([Designation_Name]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Variants_FamilyId] ON [Variants] ([FamilyId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Variants_Id] ON [Variants] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    CREATE INDEX [IX_Variants_UpdateDate] ON [Variants] ([UpdateDate]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302133103_Initbase'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250302133103_Initbase', N'8.0.7');
END;
GO

COMMIT;
GO

