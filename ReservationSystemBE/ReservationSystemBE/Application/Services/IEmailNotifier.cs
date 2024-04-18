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
            htmlContent = "<!DOCTYPE html>\r\n<html lang=\"cs\">\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n<title>Zamítnutí objednávky</title>\r\n<style>\r\n    body {\r\n        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\r\n        background-color: #f9f9f9;\r\n        margin: 0;\r\n        padding: 0;\r\n        color: #333;\r\n    }\r\n    .container {\r\n        background-color: #fff;\r\n        max-width: 600px;\r\n        margin: 40px auto;\r\n        padding: 20px;\r\n        box-shadow: 0 4px 8px rgba(0,0,0,0.1);\r\n        border: 1px solid #ddd;\r\n    }\r\n    h1 {\r\n        color: #d9534f;\r\n        font-size: 24px;\r\n        text-align: center;\r\n    }\r\n    p {\r\n        font-size: 16px;\r\n        line-height: 1.5;\r\n        margin-top: 20px;\r\n    }\r\n    .footer {\r\n        font-size: 12px;\r\n        text-align: center;\r\n        margin-top: 20px;\r\n        color: #666;\r\n    }\r\n    .important {\r\n        color: #d9534f;\r\n        font-weight: bold;\r\n    }\r\n    header {\r\n        text-align: center;\r\n        margin-bottom: 20px;\r\n    }\r\n    header img {\r\n        width: 150px;\r\n    }\r\n</style>\r\n</head>\r\n<body>\r\n<div class=\"container\">\r\n    <header>\r\n        <img src=\"http://cdn.mcauto-images-production.sendgrid.net/1e55a3a5dcaf4772/68d5cb46-870f-4863-a550-248bcf44c883/3375x3375.jpeg\">\r\n    </header>\r\n    <h1>Objednávka zamítnuta</h1>\r\n    <p>Dobrý den <span class=\"important\">" + userName + "</span>,</p>\r\n    <p>Bohužel musíme oznámit, že vaše objednávka byla zamítnuta.</p>\r\n    <p>Pro více informací nebo pokud máte jakékoli dotazy, neváhejte nás kontaktovat na <a href=\"lanzaya@email.cz\">lanzaya@email.cz</a> nebo volat na 737 513 759.</p>\r\n    <div class=\"footer\">\r\n        <p>Omlouváme se za nepříjemnosti a děkujeme za vaši shovívavost.</p>\r\n        <p>City Campus Coffe</p>\r\n    </div>\r\n</div>\r\n</body>\r\n</html>\r\n";
            subject = "Zamítnutí objednávky";
        }
        else if (status == OrderStatus.InPreparation)
        {
            plainTextContent = "Objednávka byla potvrzena";
            htmlContent = "<!DOCTYPE html>\r\n<html lang=\"cs\">\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n<title>Potvrzení objednávky</title>\r\n<style>\r\n    body {\r\n        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\r\n        background-color: #f9f9f9;\r\n        margin: 0;\r\n        padding: 0;\r\n        color: #333;\r\n    }\r\n    .container {\r\n        background-color: #fff;\r\n        max-width: 600px;\r\n        margin: 40px auto;\r\n        padding: 20px;\r\n        box-shadow: 0 4px 8px rgba(0,0,0,0.1);\r\n        border: 1px solid #ddd;\r\n    }\r\n    h1 {\r\n        color: #5cb85c; /* Green color for confirmation */\r\n        font-size: 24px;\r\n        text-align: center;\r\n    }\r\n    p {\r\n        font-size: 16px;\r\n        line-height: 1.5;\r\n        margin-top: 20px;\r\n    }\r\n    .footer {\r\n        font-size: 12px;\r\n        text-align: center;\r\n        margin-top: 20px;\r\n        color: #666;\r\n    }\r\n    .important {\r\n        color: #5cb85c; /* Green color for important elements */\r\n        font-weight: bold;\r\n    }\r\n    header {\r\n        text-align: center;\r\n        margin-bottom: 20px;\r\n    }\r\n    header img {\r\n        width: 150px;\r\n    }\r\n</style>\r\n</head>\r\n<body>\r\n<div class=\"container\">\r\n    <header>\r\n        <img src=\"http://cdn.mcauto-images-production.sendgrid.net/1e55a3a5dcaf4772/68d5cb46-870f-4863-a550-248bcf44c883/3375x3375.jpeg\">\r\n    </header>\r\n    <h1>Objednávka přijata</h1>\r\n    <p>Dobrý den <span class=\"important\">" + userName + "</span>,</p>\r\n    <p>Vaše objednávka byla úspěšně potvrzena a nyní se připravuje.</p>\r\n    <p>Pokud máte jakékoli dotazy nebo potřebujete více informací, neváhejte nás kontaktovat na <a href=\"lanzaya@email.cz\">lanzaya@email.cz</a> nebo volat na 737 513 759.</p>\r\n    <div class=\"footer\">\r\n        <p>Děkujeme za vaši objednávku!</p>\r\n        <p>City Campus Coffee</p>\r\n    </div>\r\n</div>\r\n</body>\r\n</html>";
            subject = "Potvrzení objednávky";
        }
        var client = new SendGridClient(_configuration["Sendgrid:ApiKey"]);
        var from = new EmailAddress(_configuration["Sendgrid:EmailAddress"], _configuration["Sendgrid:EmailName"]);
        var to = new EmailAddress(email, userName);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
}
