using MediatR;
using ReservationSystemBE.Application.Services;

namespace ReservationSystemBE.Application.Test;

public record GetTokenCommand : IRequest<string>;

public class GetTokenCommandHandler : IRequestHandler<GetTokenCommand, string>
{
    private readonly IAuthService _authService;

    public GetTokenCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public Task<string> Handle(GetTokenCommand request, CancellationToken cancellationToken)
    {
        return _authService.GenerateToken();
    }
}
