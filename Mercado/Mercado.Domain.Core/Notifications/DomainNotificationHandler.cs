using System.Collections.Generic;
using System.Linq;

namespace Mercado.Domain.Core.Notifications
{
    public class DomainNotificationHandler : INotificationHandler
    {
        private List<DomainNotification> _notifications;
        public DomainNotificationHandler()
        {
            _notifications = new List<DomainNotification>();
        }

        public void Handle(DomainNotification notification)
        {
            _notifications.Add(notification);
        }

        public List<DomainNotification> GetNotifications()
        {
            return _notifications;
        }

        public bool HaveNotification()
        {
            return _notifications.Any();
        }
    }
}
