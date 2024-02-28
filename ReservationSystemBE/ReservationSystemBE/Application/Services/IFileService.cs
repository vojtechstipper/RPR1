namespace ReservationSystemBE.Application.Services;

public interface IFileService
{
    Task<string> UploadFile(IFormFile _IFormFile);
    Task<(byte[], string, string)> DownloadFile(string FileName);
}

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _hostingEnvironment;

    public FileService(IWebHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment;
    }

    public Task<(byte[], string, string)> DownloadFile(string FileName)
    {
        throw new NotImplementedException();
    }

    public async Task<string> UploadFile(IFormFile file)
    {
        string uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "Assets");
        var newFileName = "";

        if (file.Length > 0)
        {
            Guid guid = Guid.NewGuid();
            var extension = Path.GetExtension(file.FileName);
            newFileName = $"{guid}{extension}";
            string filePath = Path.Combine(uploads, newFileName);
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
        }
        return newFileName;
    }
}
