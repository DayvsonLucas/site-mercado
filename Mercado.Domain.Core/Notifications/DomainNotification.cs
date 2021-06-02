namespace Mercado.Domain.Core.Notifications
{
    public class DomainNotification
    {
        public DomainNotification(string message)
        {
            Message = message;
        }
        public string Message { get; set; }
    }
}
