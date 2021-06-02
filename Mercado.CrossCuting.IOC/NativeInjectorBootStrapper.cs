
using Microsoft.AspNetCore.Http;
using Mercado.Domain.Core.Notifications;
using Mercado.Domain.Entities;
using Mercado.Domain.Validations;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Mercado.Infra.Data.Interface;
using Mercado.Infra.Data.Repository;
using Mercado.Application.Interface;
using Mercado.Application.Services;

namespace Mercado.CrossCuting.IOC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            InfraData(services);
            Services(services);
            Notification(services);
            Validators(services);
        }

        private static void InfraData(IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
        }
        private static void Services(IServiceCollection services)
        {
            services.AddScoped<IProductServices, ProductServices>();
        }
        private static void Notification(IServiceCollection services)
        {
            services.AddScoped<INotificationHandler, DomainNotificationHandler>();
        }
        private static void Validators(IServiceCollection services)
        {
            services.AddSingleton<IValidator<Product>, ProductValidator>();
        }
    }
}
