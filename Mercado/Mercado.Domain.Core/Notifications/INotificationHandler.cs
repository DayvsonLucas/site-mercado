using System.Collections.Generic;

namespace Mercado.Domain.Core.Notifications
{
    public interface INotificationHandler
    {
        void Handle(DomainNotification notification);
        List<DomainNotification> GetNotifications();
        bool HaveNotification();
    }
}
