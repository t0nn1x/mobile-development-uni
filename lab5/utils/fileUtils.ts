import * as FileSystem from "expo-file-system";

// Format bytes into human-readable size
export const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === undefined) return "Unknown";

  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

// Format date from timestamp
export const formatDate = (timestamp: number | undefined): string => {
  if (timestamp === undefined) return "Unknown";

  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  if (parts.length === 1) return "";
  return parts[parts.length - 1].toLowerCase();
};

// Determine file type based on extension
export const getFileType = (filename: string): string => {
  const ext = getFileExtension(filename);

  if (!ext) return "Unknown";

  // Common text file extensions
  const textExtensions = [
    "txt",
    "md",
    "json",
    "csv",
    "xml",
    "html",
    "css",
    "js",
    "ts",
  ];

  // Programming languages
  const pythonExtensions = ["py", "pyc", "pyd", "pyo", "pyw", "pyz"];
  const javaExtensions = ["java", "class", "jar"];
  const cFamilyExtensions = ["c", "cpp", "h", "hpp", "cc", "cxx"];
  const webDevExtensions = ["html", "css", "js", "jsx", "ts", "tsx", "php"];
  const scriptExtensions = ["sh", "bash", "bat", "cmd", "ps1"];
  const dataExtensions = ["json", "yaml", "yml", "xml", "csv", "tsv"];

  // Media files
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "tiff",
  ];
  const audioExtensions = ["mp3", "wav", "ogg", "flac", "aac", "m4a", "wma"];
  const videoExtensions = [
    "mp4",
    "avi",
    "mov",
    "wmv",
    "flv",
    "mkv",
    "webm",
    "3gp",
  ];

  // Document extensions
  const docExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "odt",
    "ods",
    "odp",
  ];
  const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2"];

  // Check file type based on extension
  if (textExtensions.includes(ext)) return "Text";
  if (pythonExtensions.includes(ext)) return "Python";
  if (javaExtensions.includes(ext)) return "Java";
  if (cFamilyExtensions.includes(ext)) return "C/C++";
  if (webDevExtensions.includes(ext)) return "Web";
  if (scriptExtensions.includes(ext)) return "Script";
  if (dataExtensions.includes(ext)) return "Data";
  if (imageExtensions.includes(ext)) return "Image";
  if (audioExtensions.includes(ext)) return "Audio";
  if (videoExtensions.includes(ext)) return "Video";
  if (docExtensions.includes(ext)) return "Document";
  if (archiveExtensions.includes(ext)) return "Archive";

  return "Unknown";
};

// Get icon name based on file type
export const getFileIcon = (filename: string, isDirectory: boolean): string => {
  if (isDirectory) return "folder";

  const fileType = getFileType(filename);
  const ext = getFileExtension(filename);

  // Generic file type icons
  switch (fileType) {
    case "Text":
      return "file-document-outline";
    case "Python":
      return "language-python";
    case "Java":
      return "language-java";
    case "C/C++":
      return "language-cpp";
    case "Web":
      return ext === "html"
        ? "language-html5"
        : ext === "css"
        ? "language-css3"
        : ext === "js" || ext === "jsx"
        ? "language-javascript"
        : ext === "ts" || ext === "tsx"
        ? "language-typescript"
        : ext === "php"
        ? "language-php"
        : "web";
    case "Script":
      return "script-text-outline";
    case "Data":
      return ext === "json" ? "code-json" : "database-outline";
    case "Image":
      return "file-image-outline";
    case "Audio":
      return "file-music-outline";
    case "Video":
      return "file-video-outline";
    case "Document":
      return ext === "pdf"
        ? "file-pdf-box"
        : ext === "doc" || ext === "docx"
        ? "file-word-outline"
        : ext === "xls" || ext === "xlsx"
        ? "file-excel-outline"
        : ext === "ppt" || ext === "pptx"
        ? "file-powerpoint-outline"
        : "file-document-outline";
    case "Archive":
      return "zip-box-outline";
    default:
      return "file-outline";
  }
};

// Check if file can be opened/edited in the app
export const isOpenableFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);
  const editableExtensions = [
    "txt",
    "md",
    "json",
    "csv",
    "xml",
    "html",
    "css",
    "js",
    "ts",
    "py",
    "java",
    "c",
    "cpp",
    "h",
    "sh",
    "yaml",
    "yml",
  ];

  return editableExtensions.includes(ext);
};

// Parse path into breadcrumb segments
export const parsePath = (
  path: string,
  baseDir: string
): { name: string; path: string }[] => {
  // Remove the baseDir from the beginning of the path
  let relativePath = path;
  if (path.startsWith(baseDir)) {
    relativePath = path.slice(baseDir.length);
  }

  // Split the path into segments
  const segments = relativePath.split("/").filter((segment) => segment !== "");

  // Build up the breadcrumb segments
  const breadcrumbs = [{ name: "Home", path: baseDir }];

  let currentPath = baseDir;
  segments.forEach((segment) => {
    currentPath += segment + "/";
    breadcrumbs.push({ name: segment, path: currentPath });
  });

  return breadcrumbs;
};

// Create a safe filename by removing invalid characters
export const createSafeFilename = (filename: string): string => {
  // Remove characters not allowed in filenames
  return filename.replace(/[\\/:*?"<>|]/g, "_");
};
