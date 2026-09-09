import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, HelpCircle } from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  bullets?: string[];
  recommendedAction?: string;
  quickReplies?: string[];
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Why is project MPL-9281 high risk?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Project MPL-9281 has a risk score of 89 because:',
      timestamp: '10:30 AM',
      bullets: [
        'Cost is 61% above comparable projects in the same region.',
        'Physical progress is 18% below the expected trajectory.',
        'Predicted completion is 3 months later than expected.',
        'A highly similar project exists within 1.4 km radius.',
        'Payment pattern shows front-loading in early stages.'
      ],
      recommendedAction: 'Verify the cost estimate, physical progress, payment records and duplicate-work possibility.',
      quickReplies: [
        'Show similar projects',
        'Why is the cost high?',
        'Predict final cost',
        'Check compliance',
        'Generate investigation report'
      ]
    }
  ]);

  // Smooth scroll to bottom on new message or drawer opening
  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate smart mock response
    setTimeout(() => {
      let aiText = `I have analyzed the dataset for "${query}". Here is the synthesis from the ML Risk Engine:`;
      let bullets: string[] = [];
      let rec: string | undefined = undefined;

      if (query.toLowerCase().includes('state') || query.toLowerCase().includes('bihar')) {
        aiText = 'State Risk Analysis for Bihar:';
        bullets = [
          'Average State Risk Index: 72 (Critical - Ranked #1 nationally).',
          'Key driver: 31% completion rate vs 47% national average.',
          'High concentration of cost anomaly flags in road construction projects.'
        ];
        rec = 'Initiate district-level audit for Aurangabad and Patna constituencies.';
      } else if (query.toLowerCase().includes('delay')) {
        aiText = 'Deadline Delay Predictions:';
        bullets = [
          '43 projects show >80% delay probability.',
          'Average delay offset is 3.4 months.',
          'Main bottlenecks: Delay in UC clearance and local NOC permissions.'
        ];
        rec = 'Dispatch automated escalation alerts to respective Nodal Officers.';
      } else if (query.toLowerCase().includes('duplicate')) {
        aiText = 'Duplicate Work Intelligence:';
        bullets = [
          '17 projects flagged with >85% spatial & textual overlap.',
          'Highest duplication risk in rural road upgrades and community centers.'
        ];
        rec = 'Cross-verify GIS coordinates with State PWD GIS layer.';
      } else {
        bullets = [
          'Continuous monitoring model active across 78,550 sanctioned works.',
          'Confidence score for risk detection: 94.2%.',
          'All anomalies categorized into Cost, Delay, Duplicate, and Payment flags.'
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bullets,
        recommendedAction: rec,
        quickReplies: [
          'Show similar projects',
          'Why is the cost high?',
          'Predict final cost',
          'Generate investigation report'
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  const suggestedPrompts = [
    'Which states have the highest risk?',
    'Show projects likely to be delayed.',
    'Find unusual expenditure patterns.',
    'Show possible duplicate projects.',
    'Why is Bihar high risk?'
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-navy-900 text-amber-400 rounded-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-navy-900">NIRVANA AI Copilot</h2>
            <p className="text-[10px] text-slate-500 font-medium">National Intelligence & Decision Support</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 scroll-smooth">
        {/* Prompt Suggestions Bar */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-navy-900" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-700 font-medium px-2.5 py-1 rounded transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {m.sender === 'user' ? (
                <>
                  <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  <span className="text-[11px] font-bold text-slate-700">You</span>
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User className="w-3 h-3" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center text-amber-400">
                    <Bot className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-navy-900">NIRVANA AI</span>
                  <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                </>
              )}
            </div>

            <div
              className={`p-3 rounded-lg max-w-[90%] text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-navy-900 text-white font-medium rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
              }`}
            >
              <p>{m.text}</p>

              {m.bullets && (
                <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-700">
                  {m.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}

              {m.recommendedAction && (
                <div className="mt-3 p-2.5 bg-amber-50/80 border border-amber-200 rounded text-[11px] text-amber-950 font-medium">
                  <div className="font-bold text-amber-900 mb-0.5">Recommended Action:</div>
                  {m.recommendedAction}
                </div>
              )}

              {m.quickReplies && (
                <div className="mt-3 flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                  {m.quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => handleSend(qr)}
                      className="text-[10px] border border-slate-300 hover:border-navy-900 hover:bg-slate-50 text-slate-700 px-2 py-0.5 rounded font-semibold transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Scroll anchor */}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 text-xs border border-slate-300 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 rounded-md px-3 py-2 outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-navy-900 text-white hover:bg-navy-800 rounded-md transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
