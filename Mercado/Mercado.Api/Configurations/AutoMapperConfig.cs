using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Mercado.Api.Configurations
{
    public static class AutoMapperConfig
    {
        public static void AddAutoMapperConfig(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddAutoMapper(typeof(Startup));
            Application.AutoMapper.AutoMapperConfig.RegisterMappings(services);
        }
    }
}
