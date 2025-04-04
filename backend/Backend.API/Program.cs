using Backend.Application.Interfaces;
using Backend.Application.Interfaces.Gateways;
using Backend.Application.Interfaces.Service;
using Backend.Application.Services.Lead;
using Backend.Infrastructure;
using Backend.Infrastructure.Gateways;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurar SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Injeção de dependências
builder.Services.AddTransient<ILeadRepository, LeadRepository>();
builder.Services.AddTransient<ICreateLeadService, CreateLeadService>();
builder.Services.AddTransient<IUpdateStatusLeadService, UpdateStatusLeadService>();
builder.Services.AddTransient<IUpdateLeadService, UpdateLeadService>();
builder.Services.AddTransient<IGetLeadService, GetLeadService>();
builder.Services.AddTransient<IEmailGateway, FakeEmailGateway>();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
