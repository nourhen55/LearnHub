import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";
import { updateUserInFirestore } from "../services/userService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const oobCode = query.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // يجب أن تحصل على هذين من مكان مناسب (مثلاً من التخزين المحلي أو من عملية تسجيل الدخول)
  const userEmail = "user@example.com";

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!oobCode) {
      setError("رابط إعادة التعيين غير صالح أو منتهي الصلاحية.");
      return;
    }

    if (newPassword.length < 8) {
      setError("كلمة المرور يجب أن تكون على الأقل 8 أحرف.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة.");
      return;
    }

    setLoading(true);
    try {
      // تغيير كلمة المرور في Firebase Auth
      await confirmPasswordReset(auth, oobCode, newPassword);

      // تحديث كلمة المرور في Firestore (ملاحظة: ليس من الأفضل تخزين كلمة السر نصية في Firestore)
      const user = {
        email: userEmail,
        password: newPassword,
      };
      await updateUserInFirestore(user);

      setSuccess("تم تغيير كلمة المرور بنجاح!");
      // إذا تريد إعادة التوجيه بعد النجاح:
      // setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError("حدث خطأ أثناء إعادة تعيين كلمة المرور: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">إعادة تعيين كلمة المرور</h2>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <input
        type="password"
        placeholder="كلمة المرور الجديدة"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="تأكيد كلمة المرور"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
      </button>
    </div>
  );
};

export default ResetPassword;
