using ReservationSystem.Domain.Orders;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace ReservationSystemBE.Application.Services;

public interface IEmailNotifier
{
    Task SendEmail(string email, string userName, OrderStatus status);
}

public class EmailNotifier : IEmailNotifier
{
    private readonly IConfiguration _configuration;

    public EmailNotifier(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmail(string email, string userName, OrderStatus status)
    {
        var plainTextContent = "";
        var htmlContent = "";
        var subject = "";

        if (status == OrderStatus.Canceled)
        {
            plainTextContent = "Objednávka byla zamítnuta";
            htmlContent = "<strong>Zamítnuto</strong>";
            subject = "Zamítnutí objednávky";
        }
        else if (status == OrderStatus.InPreparation)
        {
            plainTextContent = "Objednávka byla potvrzena";
            htmlContent = "<strong>Potvrzeno</strong>";
            subject = "Potvrzení objednávky";
        }
        var client = new SendGridClient(_configuration["Sendgrid:ApiKey"]);
        var from = new EmailAddress(_configuration["Sendgrid:EmailAddress"], _configuration["Sendgrid:EmailName"]);
        var to = new EmailAddress(email, userName);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
}
