using ReservationSystem.Domain.Orders;
using ReservationSystem.Shared.DTO;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace ReservationSystemBE.Application.Services;

public interface IEmailNotifier
{
    Task SendEmail(string email, string userName, OrderStatus status, TemplateMailData? templateData);
}

public class EmailNotifier : IEmailNotifier
{
    private readonly IConfiguration _configuration;

    public EmailNotifier(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmail(string email, string userName, OrderStatus status, TemplateMailData? templateData)
    {
        var client = new SendGridClient(_configuration["Sendgrid:ApiKey"]);
        var from = new EmailAddress(_configuration["Sendgrid:EmailAddress"], _configuration["Sendgrid:EmailName"]);
        var to = new EmailAddress(email, userName);
        var msg = MailHelper.CreateSingleTemplateEmail(from, to, status == OrderStatus.Canceled ? _configuration["Sendgrid:CancelledTemplateId"] : _configuration["Sendgrid:SuccessTemplateId"], templateData);
        await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
}
