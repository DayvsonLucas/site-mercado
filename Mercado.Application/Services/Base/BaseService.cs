using FluentValidation;
using FluentValidation.Results;
using Mercado.Domain.Core.Notifications;
using Mercado.Domain.Core.Models;

namespace Mercado.Application.Services.Base
{
    public abstract class BaseService
    {
        private readonly INotificationHandler _notification;

        protected BaseService(INotificationHandler notification)
        {
            _notification = notification;
        }

        protected void Notify(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notify(error.ErrorMessage);
            }
        }
        protected void Notify(string message)
        {
            _notification.Handle(new DomainNotification(message));
        }

        protected bool ExecuteValidation<TV, TE>(TV validator, TE entity) where TV : AbstractValidator<TE> where TE : Entity
        {
            var valid = validator.Validate(entity);

            if (valid.IsValid) return true;

            Notify(valid);

            return false;
        }
    }
}
