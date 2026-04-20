import { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Moon, Sun, Facebook, Send } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'payment'>('contact');
  const [copiedStk, setCopiedStk] = useState(false);
  const [copiedPaypal, setCopiedPaypal] = useState(false);

  // Default to system preference if available
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const accountInfo = {
    bank: "BIDV",
    accName: "PHẠM GIA HUY",
    accNumber: "8892063216",
    paypalLink: "paypal.me/phamgiahuy2008",
  };

  const contactInfo = [
    {
      name: "Facebook",
      id: "phamgiahuy.vn",
      url: "https://www.facebook.com/phamgiahuy.vn",
      icon: <Facebook className="w-7 h-7" />
    },
    {
      name: "Telegram",
      id: "@phamgiahuy_vn",
      url: "https://t.me/phamgiahuy_vn",
      icon: <Send className="w-6 h-6" /> // Send icon closely resembles Telegram
    }
  ];

  // Sử dụng qr_only để chỉ lấy mã QR
  const qrUrl = `https://img.vietqr.io/image/bidv-${accountInfo.accNumber}-qr_only.png`;

  const handleCopy = (text: string, type: 'stk' | 'paypal') => {
  const copyToClipboard = (str: string) => {
    // Modern Clipboard API (requires HTTPS / focus)
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(str);
    }
    // Fallback: execCommand (works in sandboxed iframes)
    const el = document.createElement('textarea');
    el.value = str;
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return Promise.resolve();
  };

  copyToClipboard(text).then(() => {
    if (type === 'stk') {
      setCopiedStk(true);
      setTimeout(() => setCopiedStk(false), 2000);
    } else {
      setCopiedPaypal(true);
      setTimeout(() => setCopiedPaypal(false), 2000);
    }
  });
};

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#EAEAEA] font-sans transition-colors duration-500 selection:bg-gray-200 dark:selection:bg-gray-800">
        
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white dark:bg-[#141414] border border-gray-200/50 dark:border-white/5 shadow-sm hover:scale-105 active:scale-95 transition-all text-gray-500 dark:text-gray-400 focus:outline-none"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content */}
        <main className="max-w-[800px] mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
          
          {/* Avatar / Initials */}
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-white/5 text-4xl font-light tracking-widest mb-6 shadow-sm transition-colors">
            PGH
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-10">
            Phạm Gia Huy
          </h1>
          
          {/* iOS Style Segmented Control for Tabs */}
          <div className="w-full max-w-xs mx-auto mb-10">
            <div className="flex p-1.5 bg-gray-200/60 dark:bg-[#1A1A1A] rounded-[1.25rem] border border-transparent dark:border-white/5 backdrop-blur-sm transition-colors">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-[1rem] transition-all duration-300 outline-none select-none ${
                  activeTab === 'contact'
                    ? 'bg-white dark:bg-[#2C2C2C] text-black dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Liên hệ
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-[1rem] transition-all duration-300 outline-none select-none ${
                  activeTab === 'payment'
                    ? 'bg-white dark:bg-[#2C2C2C] text-black dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Chuyển khoản
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center mt-2 transition-all duration-500 ease-in-out">
            {/* ----------------- TAB: CONTACT ----------------- */}
            {activeTab === 'contact' && (
              <div className="w-full max-w-[500px] flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {contactInfo.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between p-4 md:p-5 rounded-[2rem] bg-white dark:bg-[#141414] border border-gray-200/60 dark:border-white/5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] transition-all hover:border-gray-300 dark:hover:border-white/10 dark:hover:bg-[#1a1a1a] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-200 group-hover:scale-110 group-hover:text-black dark:group-hover:text-white transition-all duration-300">
                        {contact.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-medium text-black dark:text-white leading-tight">
                          {contact.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {contact.id}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors bg-gray-50 dark:bg-transparent mr-2 shrink-0">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* ----------------- TAB: PAYMENT ----------------- */}
            {activeTab === 'payment' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* BIDV Block */}
                <div className="flex flex-col items-center md:items-start p-8 rounded-[2rem] bg-white dark:bg-[#141414] border border-gray-200/60 dark:border-white/5 shadow-[0_2px_15px_rgb(0,0,0,0.03)] dark:shadow-none w-full transition-colors h-full">
                  <h3 className="text-2xl font-medium mb-8 text-black dark:text-white tracking-tight">BIDV</h3>
                  
                  <div className="flex flex-col items-center md:items-start w-full space-y-6">
                    {/* QR Code */}
                    <div className="p-3 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 ring-1 ring-black/5 flex justify-center items-center">
                      <img 
                        src={qrUrl} 
                        alt="VietQR" 
                        className="w-48 h-48 md:w-52 md:h-52 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="w-full pt-4 flex flex-col items-center md:items-start space-y-4">
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1">
                          Chủ tài khoản
                        </span>
                        <span className="text-lg font-medium text-black dark:text-white">
                          {accountInfo.accName}
                        </span>
                      </div>

                      <div className="flex flex-col items-center md:items-start w-full">
                        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-1">
                          Số tài khoản
                        </span>
                        <div 
                          onClick={() => handleCopy(accountInfo.accNumber, 'stk')}
                          className="group flex items-center justify-between w-full md:w-auto gap-4 p-3 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 cursor-pointer active:scale-95 transition-all text-black dark:text-white"
                        >
                          <span className="font-mono text-xl tracking-tight font-medium">
                            {accountInfo.accNumber}
                          </span>
                          <div className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                            {copiedStk ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PayPal Block */}
                <div className="flex flex-col items-center md:items-start p-8 rounded-[2rem] bg-white dark:bg-[#141414] border border-gray-200/60 dark:border-white/5 shadow-[0_2px_15px_rgb(0,0,0,0.03)] dark:shadow-none w-full transition-colors h-full">
                  <h3 className="text-2xl font-medium mb-8 text-black dark:text-white tracking-tight">Paypal</h3>
                  
                  <div className="flex flex-col items-center md:items-start w-full">
                    <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold mb-3">
                      Paypal Link
                    </span>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors w-full group">
                        <a 
                          href={`https://${accountInfo.paypalLink}`}
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-black dark:text-white font-medium text-lg hover:underline truncate"
                        >
                          {accountInfo.paypalLink}
                        </a>
                        
                        <div className="flex items-center gap-1 ml-4 shadow-none shrink-0">
                          <button 
                            onClick={(e) => { e.preventDefault(); handleCopy(accountInfo.paypalLink, 'paypal'); }}
                            className="p-2 rounded-md bg-white dark:bg-transparent border border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-black dark:hover:text-white transition-colors active:scale-95"
                            title="Copy link"
                          >
                            {copiedPaypal ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <a 
                            href={`https://${accountInfo.paypalLink}`}
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2 rounded-md bg-white dark:bg-transparent border border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-black dark:hover:text-white transition-colors active:scale-95"
                            title="Mở link Paypal"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
          
        </main>
      </div>
    </div>
  );
}
