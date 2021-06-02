using FluentValidation;
using Mercado.Domain.Entities;

namespace Mercado.Domain.Validations
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("O campo Name precisa ser fornecido");

            RuleFor(f => f.Quantity)
             .NotEmpty().WithMessage("O campo Quantity precisa ser fornecido");

            RuleFor(f => f.UnitaryValue)
                .NotEmpty().WithMessage("O campo UnitaryValue precisa ser fornecido");
        }
    }
}
