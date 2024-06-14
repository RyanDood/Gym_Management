using Gym_Management.Context;
using Gym_Management.Interfaces;
using Gym_Management.Models;
using Gym_Management.Repositories;
using Gym_Management.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<GymManagementContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetConnectionString("LocalConnectionString"));
});

builder.Services.AddScoped<IRepository<int, User>, UserRepository>();
builder.Services.AddScoped<IRepository<int, Member>, MemberRepository>();

builder.Services.AddScoped<IMemberAdminService, MemberService>();
//builder.Services.AddScoped<IBranchesAdminService, BranchesService>();

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
