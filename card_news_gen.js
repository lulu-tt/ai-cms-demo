/**
 * AI Card News Generator Simulation
 * Phase 3: High-Fidelity Simulation by Developer Kodari
 */

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor-body');
    const titleInput = document.getElementById('post-title');
    const summaryBox = document.getElementById('ai-summary');
    const keywordsBox = document.getElementById('ai-keywords');
    const previewText = document.getElementById('preview-text');
    const genBtn = document.getElementById('gen-card-btn');
    const cardBg = document.getElementById('card-bg');
    const uploadZone = document.getElementById('upload-zone');
    const statusCard = document.getElementById('ai-status-card');

    // Youth Support Scenario Data
    const youthScenario = {
        title: "2026년 청년 맞춤형 주거지원 정책 안내",
        content: `본 공고는 청년들의 주거 안정을 위한 정부 지원금 사업을 안내합니다.

주요 내용:
1. 청년 월세 특별지원: 무주택 청년 대상 월 최대 20만원 지원 (12개월)
2. 전세보증금 반환보증 보증료 지원: 최대 30만원 한도 실비 지원
3. 대상: 만 19세 ~ 34세 이하 청년 중 기준 중위소득 60% 이하

신청은 5월 1일부터 정부24 홈페이지를 통해 가능합니다.`,
        summary: `• 청년 월세 특별지원 (월 최대 20만원, 12개월)<br>
                 • 전세보증금 반환보증 보증료 지원 (최대 30만원)<br>
                 • 정부24를 통한 온라인 신청 (5월 1일 오픈)`,
        keywords: ['청년지원', '기획예산', '주거안정', '월세지원', '청년정책', '정부24']
    };

    function updateAI(text, title) {
        if (text.length > 20) {
            summaryBox.innerHTML = `분석 결과:<br>${youthScenario.summary}`;
            keywordsBox.innerHTML = youthScenario.keywords.map(k => `<span class="tag">${k}</span>`).join('');
            previewText.innerText = title || "청년 지원 정책 안내";
        }
    }

    // File Analysis Simulation
    uploadZone.addEventListener('click', () => {
        statusCard.style.display = 'block';
        summaryBox.innerText = "파일에서 텍스트를 추출하고 있습니다...";
        
        setTimeout(() => {
            titleInput.value = youthScenario.title;
            editor.innerText = youthScenario.content;
            statusCard.style.display = 'none';
            updateAI(youthScenario.content, youthScenario.title);
            
            // Interaction effects
            editor.style.backgroundColor = '#fff9db';
            setTimeout(() => editor.style.backgroundColor = 'transparent', 1000);
        }, 2000);
    });

    // Real-time Editor Sync
    editor.addEventListener('input', () => {
        updateAI(editor.innerText, titleInput.value);
    });

    titleInput.addEventListener('input', () => {
        previewText.innerText = titleInput.value;
    });

    // Card News Generation logic
    genBtn.addEventListener('click', () => {
        const originalBtnText = genBtn.innerHTML;
        genBtn.innerHTML = `<span>⏳</span> 이미지 렌더링 중...`;
        genBtn.disabled = true;

        setTimeout(() => {
            // Pick a thematic image for Youth/Success
            const youthImages = [
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600',
                'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600'
            ];
            cardBg.src = youthImages[Math.floor(Math.random() * youthImages.length)];
            
            // Visual feedback on the overlay
            const overlay = document.getElementById('card-overlay');
            overlay.style.backgroundColor = 'rgba(0,123,255,0.4)';
            setTimeout(() => overlay.style.backgroundColor = 'rgba(0,0,0,0.5)', 800);

            genBtn.innerHTML = `<span>✨</span> 완성되었습니다!`;
            
            setTimeout(() => {
                genBtn.innerHTML = originalBtnText;
                genBtn.disabled = false;
            }, 2000);
        }, 1800);
    });
});
