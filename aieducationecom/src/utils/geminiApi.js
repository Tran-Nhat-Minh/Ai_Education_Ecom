  // Gemini API integration
  import { GoogleGenerativeAI } from "@google/generative-ai";

  // Initialize the Gemini API client
  // Using a fixed API key provided by the application
  const GEMINI_API_KEY = "AIzaSyBKMQ4ZcHv-66-IxDDmCy5lhSNE4pIVFPA";
  let genAI = null;
  let model = null;

  // Initialize the API automatically
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Gemini API initialized automatically");
  } catch (error) {
    console.error("Error initializing Gemini API:", error);
  }

  /**
   * Initialize the Gemini API client with your API key (for backward compatibility)
   * @param {string} apiKey - Your Gemini API key (optional, will use default if not provided)
   */
  export const initGeminiApi = (apiKey = GEMINI_API_KEY) => {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      return true;
    } catch (error) {
      console.error("Error initializing Gemini API:", error);
      return false;
    }
  };

  /**
   * Get personalized course recommendations based on user preferences and history
   * @param {Array} viewHistory - User's view history
   * @param {Array} favorites - User's favorite courses
   * @param {Array} allProducts - All available courses
   * @returns {Promise<Array>} - Array of recommended course IDs with reasons
   */
export const getPersonalizedRecommendations = async (viewHistory, favorites, allProducts) => {
  if (!genAI || !model) {
    throw new Error("Gemini API not initialized. Call initGeminiApi first.");
  }

  try {
    // Chuẩn bị dữ liệu đầu vào
    const viewedProducts = viewHistory.map(item => {
      const product = allProducts.find(p => p.id === item.productId);
      return product ? {
        id: product.id,
        name: product.name,
        category: product.category,
        level: product.level,
        viewedAt: item.viewedAt
      } : null;
    }).filter(Boolean);

    const favoriteProducts = allProducts
      .filter(p => favorites.includes(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        level: p.level
      }));

    // Prompt cho Gemini
    const prompt = `
      Bạn là một trợ lý AI chuyên về đề xuất khóa học giáo dục. Dựa trên dữ liệu người dùng sau đây, 
      hãy đề xuất 3-5 khóa học phù hợp nhất từ danh sách khóa học có sẵn. 
      Đối với mỗi khóa học được đề xuất, hãy cung cấp lý do ngắn gọn tại sao khóa học đó phù hợp với người dùng.

      Lưu ý: KHÔNG sử dụng markdown hoặc ký tự như \`\`\`json. Trả về kết quả thuần JSON.

      LỊCH SỬ XEM CỦA NGƯỜI DÙNG:
      ${JSON.stringify(viewedProducts, null, 2)}

      KHÓA HỌC YÊU THÍCH CỦA NGƯỜI DÙNG:
      ${JSON.stringify(favoriteProducts, null, 2)}

      DANH SÁCH TẤT CẢ KHÓA HỌC:
      ${JSON.stringify(allProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        level: p.level,
        price: p.price,
        shortDescription: p.shortDescription
      })), null, 2)}

      Trả về theo mẫu:
      {
        "recommendations": [
          {
            "id": 1,
            "reason": "Khóa học này phù hợp vì..."
          }
        ]
      }
      `;

    // Gửi yêu cầu tới Gemini
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // ✅ Làm sạch chuỗi trước khi parse
    const cleanedText = rawText
      .replace(/```json\n?/gi, '')
      .replace(/```$/g, '')
      .trim();

    try {
      const parsed = JSON.parse(cleanedText);
      return parsed.recommendations || [];
    } catch (parseError) {
      console.error("❌ JSON parse failed:", parseError);
      console.warn("⛔ Raw Gemini response:", rawText);

      // Fallback: return 4 khóa học phổ biến
      return allProducts.slice(0, 4).map(p => ({
        id: p.id,
        reason: "Khóa học phổ biến"
      }));
    }

  } catch (error) {
    console.error("❌ Error calling Gemini:", error);

    // Fallback khi gặp lỗi API
    return allProducts.slice(0, 4).map(p => ({
      id: p.id,
      reason: "Khóa học phổ biến"
    }));
  }
};


  /**
   * Store the API key in localStorage (for backward compatibility)
   * @param {string} apiKey - Gemini API key to store
   */
  export const storeApiKey = (apiKey) => {
    // Always return true since we're using a fixed API key
    return true;
  };

  /**
   * Get the stored API key from localStorage
   * @returns {string} - The default API key
   */
  export const getStoredApiKey = () => {
    // Always return the default API key
    return GEMINI_API_KEY;
  };

  /**
   * Check if the API key is valid by making a test request
   * @param {string} apiKey - The API key to validate (not used, always validates the default key)
   * @returns {Promise<boolean>} - Whether the API key is valid
   */
  export const validateApiKey = async (apiKey = GEMINI_API_KEY) => {
    try {
      // We're using the already initialized model
      if (model) {
        // Make a simple test request
        const result = await model.generateContent("Hello, this is a test request.");
        return !!result.response.text();
      }
      
      // If model isn't initialized yet, try to initialize it
      const tempGenAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const tempModel = tempGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Make a simple test request
      const result = await tempModel.generateContent("Hello, this is a test request.");
      return !!result.response.text();
    } catch (error) {
      console.error("API key validation failed:", error);
      return false;
    }
  };