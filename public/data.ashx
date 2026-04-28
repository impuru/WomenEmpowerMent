<%@ WebHandler Language="C#" Class="update_data" %>

using System;
using System.Web;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections.Generic;

public class update_data : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {


        context.Response.ContentType = "application/json";



        try
        {





            // Get the path to data.json file
            string dataFilePath = context.Server.MapPath("~/data.json");
            // Validate the file path
            if (string.IsNullOrEmpty(dataFilePath) || !dataFilePath.EndsWith("data.json"))
            {
                context.Response.StatusCode = 500;
                WriteJsonResponse(context, new { success = false, message = "Invalid file path configuration" });
                return;
            }
            string body = string.Empty;
            using (StreamReader sr = new StreamReader(dataFilePath))
            {
                body = sr.ReadToEnd();
            }

            context.Response.Write(body);
            context.Response.StatusCode = 200;


        }
        catch (ArgumentException argEx)
        {
            context.Response.StatusCode = 400;
            WriteJsonResponse(context, new
            {
                success = false,
                message = "Invalid JSON format: " + argEx.Message
            });
        }
        catch (IOException ioEx)
        {
            context.Response.StatusCode = 500;
            WriteJsonResponse(context, new
            {
                success = false,
                message = "File write error: " + ioEx.Message
            });
        }
        catch (UnauthorizedAccessException uaEx)
        {
            context.Response.StatusCode = 403;
            WriteJsonResponse(context, new
            {
                success = false,
                message = "Access denied: " + uaEx.Message
            });
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            WriteJsonResponse(context, new
            {
                success = false,
                message = "Server error: " + ex.Message
            });
        }
    }

    /// <summary>
    /// Get the full path to data.json file
    /// Tries multiple possible locations
    /// </summary>
    private string GetDataFilePath(HttpContext context)
    {
        try
        {
            // Method 1: From web root - most common for web applications
            string webRootPath = context.Server.MapPath("~/data.json");
            if (File.Exists(webRootPath))
            {
                return webRootPath;
            }

            // Method 2: In public folder
            string publicPath = context.Server.MapPath("~/data.json");
            if (File.Exists(publicPath))
            {
                return publicPath;
            }

            // Method 3: Default to ~/data.json
            return webRootPath;

        }
        catch
        {
            // Fallback
            return context.Server.MapPath("~/data.json");
        }
    }

    /// <summary>
    /// Convert object to pretty-printed JSON string
    /// </summary>
    //private string PrettyPrintJson(dynamic obj, JavaScriptSerializer serializer) {
    //    try {
    //        string json = serializer.Serialize(obj);
    //        dynamic parsedObj = serializer.DeserializeObject(json);
    //        return FormatJson(json);
    //    } catch {
    //        return serializer.Serialize(obj);
    //    }
    //}

    /// <summary>
    /// Format JSON string with proper indentation
    /// </summary>
    //private string FormatJson(string json) {
    //    try {
    //        var options = new System.Text.Json.JsonSerializerOptions 
    //        { 
    //            WriteIndented = true 
    //        };
    //        var parsedJson = System.Text.Json.JsonDocument.Parse(json);
    //        return System.Text.Json.JsonSerializer.Serialize(
    //            parsedJson.RootElement, 
    //            options
    //        );
    //    } catch {
    //        // If formatting fails, return original
    //        return json;
    //    }
    //}

    /// <summary>
    /// Write JSON response to context
    /// </summary>
    private void WriteJsonResponse(HttpContext context, dynamic responseData)
    {
        try
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(responseData);
            context.Response.Write(json);
        }
        catch
        {
            context.Response.Write("{\"success\": false, \"message\": \"Error serializing response\"}");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}