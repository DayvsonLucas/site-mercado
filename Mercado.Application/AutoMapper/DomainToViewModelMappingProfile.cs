using AutoMapper;
using Mercado.Application.ViewModels;
using Mercado.Domain.Entities;

namespace Mercado.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Product, ProductViewModel>();
        }
    }
}
