using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Identity;
using Mercado.Domain.Core.Notifications;

namespace Mercado.Api.Controllers.Base
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        private readonly INotificationHandler _notification;

        protected BaseController(INotificationHandler notification)
        {
            _notification = notification;
        }

        protected new ActionResult Response(object result = null)
        {
            if (IsValidOperation())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = _notification.GetNotifications().Select(n => n.Message)
            });
        }
        protected new ActionResult Response(ModelStateDictionary modelState)
        {
            if (!modelState.IsValid) NotifyModelStateErrors(modelState);

            return Response();
        }
        protected bool IsValidOperation()
        {
            return !_notification.HaveNotification();
        }

        protected void NotifyModelStateErrors(ModelStateDictionary modelState)
        {
            var errors = modelState.Values.SelectMany(e => e.Errors);
            foreach (var error in errors)
            {
                var msg = error.Exception == null ? error.ErrorMessage : error.Exception.Message;
                NotifyError(msg);
            }
        }

        protected void NotifyError(string message)
        {
            _notification.Handle(new DomainNotification(message));
        }
        protected void AddIdentityErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                NotifyError(error.Description);
            }
        }
    }
}