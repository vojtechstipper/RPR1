using MediatR;
using ReservationSystemBE.Application.Services;

namespace ReservationSystemBE.Application.Products.Commands.UploadImageCommand;

public record UploadImageCommand(IFormFile File) : IRequest<string>;
public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, string>
{
    private readonly IFileService _fileService;

    public UploadImageCommandHandler(IFileService fileService)
    {
        _fileService = fileService;
    }

    public async Task<string> Handle(UploadImageCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _fileService.UploadFile(request.File);
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
