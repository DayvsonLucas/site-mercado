using AutoMapper;
using Mercado.Application.ViewModels;
using Mercado.Domain.Entities;

namespace Mercado.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ProductViewModel, Product>();
        }
    }
}
