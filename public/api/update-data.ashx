<%@ WebHandler Language="C#" Class="update_data" %>

using System;
using System.Web;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections.Generic;

public class update_data : IHttpHandler {

    public void ProcessRequest (HttpContext context) {


        context.Response.ContentType = "application/json";



        // Only allow POST requests
        if (context.Request.HttpMethod != "POST") {
            context.Response.StatusCode = 405;
            WriteJsonResponse(context, new { success = false, message = "Only POST method is allowed" });
            return;
        }

        try {
            // Read the request body
            string jsonInput;
            using (StreamReader reader = new StreamReader(context.Request.InputStream, Encoding.UTF8)) {
                jsonInput = reader.ReadToEnd();
            }

            if (string.IsNullOrEmpty(jsonInput)) {
                context.Response.StatusCode = 400;
                WriteJsonResponse(context, new { success = false, message = "Request body is empty" });
                return;
            }

            // Parse the incoming JSON
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            dynamic requestData = serializer.DeserializeObject(jsonInput);

            // Extract the data object
            if (requestData == null || !((Dictionary<string, object>)requestData).ContainsKey("data")) {
                context.Response.StatusCode = 400;
                WriteJsonResponse(context, new { success = false, message = "Invalid request format. Expected 'data' field." });
                return;
            }

            object dataObject = ((Dictionary<string, object>)requestData)["data"];

            // Convert back to formatted JSON string
            string jsonContent = serializer.Serialize(dataObject);

            // Parse and re-serialize to pretty-print the JSON
            dynamic parsedData = serializer.DeserializeObject(jsonContent);
            string formattedJson = Newtonsoft.Json.JsonConvert.SerializeObject(parsedData);

            // Get the path to data.json file
            string dataFilePath = context.Server.MapPath("~/data.json");

            // Validate the file path
            if (string.IsNullOrEmpty(dataFilePath) || !dataFilePath.EndsWith("data.json")) {
                context.Response.StatusCode = 500;
                WriteJsonResponse(context, new { success = false, message = "Invalid file path configuration" });
                return;
            }



            // Write to file
            File.WriteAllText(dataFilePath, formattedJson, Encoding.UTF8);

            context.Response.StatusCode = 200;
            WriteJsonResponse(context, new {
                success = true,
                message = "Data saved successfully!",
                filePath = dataFilePath,
                timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            });

        } catch (ArgumentException argEx) {
            context.Response.StatusCode = 400;
            WriteJsonResponse(context, new {
                success = false,
                message = "Invalid JSON format: " + argEx.Message
            });
        } catch (IOException ioEx) {
            context.Response.StatusCode = 500;
            WriteJsonResponse(context, new {
                success = false,
                message = "File write error: " + ioEx.Message
            });
        } catch (UnauthorizedAccessException uaEx) {
            context.Response.StatusCode = 403;
            WriteJsonResponse(context, new {
                success = false,
                message = "Access denied: " + uaEx.Message
            });
        } catch (Exception ex) {
            context.Response.StatusCode = 500;
            WriteJsonResponse(context, new {
                success = false,
                message = "Server error: " + ex.Message
            });
        }
    }

    /// <summary>
    /// Get the full path to data.json file
    /// Tries multiple possible locations
    /// </summary>
    private string GetDataFilePath(HttpContext context) {
        try {
            // Method 1: From web root - most common for web applications
            string webRootPath = context.Server.MapPath("~/data.json");
            if (File.Exists(webRootPath)) {
                return webRootPath;
            }

            // Method 2: In public folder
            string publicPath = context.Server.MapPath("~/data.json");
            if (File.Exists(publicPath)) {
                return publicPath;
            }

            // Method 3: Default to ~/data.json
            return webRootPath;

        } catch {
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
    private void WriteJsonResponse(HttpContext context, dynamic responseData) {
        try {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(responseData);
            context.Response.Write(json);
        } catch {
            context.Response.Write("{\"success\": false, \"message\": \"Error serializing response\"}");
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}