using backend_egov.Context;
using backend_egov.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            //policy.AllowAnyOrigin()         // Allow any origin
            policy.WithOrigins("http://localhost:5173")   //  Allow specific frontend
                  .AllowCredentials()       // Allow cookies & auth headers
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddScoped<IPasswordHasher<CustomerModel>, PasswordHasher<CustomerModel>>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add the in-memory cache service (required for sessions)
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSession();
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.Run();
