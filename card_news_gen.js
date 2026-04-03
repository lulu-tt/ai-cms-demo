/**
 * AI CMS Demo - High-Fidelity Logic by Developer Kodari
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const editor = document.getElementById('editor-body');
    const titleInput = document.getElementById('post-title');
    const summaryBox = document.getElementById('ai-summary');
    const keywordsBox = document.getElementById('ai-keywords');
    const previewText = document.getElementById('preview-text');
    const cardBg = document.getElementById('card-bg');
    const uploadZone = document.getElementById('upload-zone');
    const fileNameDisplay = document.getElementById('file-name-display');
    const analyzeBtn = document.getElementById('analyze-trigger-btn');
    const genBtn = document.getElementById('gen-card-btn');
    const downloadBtn = document.getElementById('download-card');
    
    // Modal Elements
    const modal = document.getElementById('progress-modal');
    const fillBar = document.getElementById('fill-bar');
    const percentText = document.getElementById('percent-text');
    const analyzingFileText = document.getElementById('analyzing-filename');
    const statusIcon = document.getElementById('file-status-icon');

    // Scenario Data
    const scenario = {
        title: "2026년 청년 맞춤형 주거지원 정책 안내",
        content: `본 공고는 청년들의 주거 안정을 위한 정부 지원금 사업을 안내합니다.\n\n주요 내용:\n1. 청년 월세 특별지원: 무주택 청년 대상 월 최대 20만원 지원 (12개월)\n2. 전세보증금 보증료 지원: 최대 30만원 실비 지원\n3. 대상: 만 19세 ~ 34세 청년`,
        summary: `• 청년 월세 특별지원 (월 20만원)<br>• 전세보증금 보증료 최대 30만원 지원<br>• 만 19~34세 정부24 점수제 선발`,
        keywords: ['청년지원', '주거복지', '월세지원', '기획예산처', '정부24']
    };

    // 1. Drag & Drop Handling
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    uploadZone.addEventListener('dragover', () => uploadZone.classList.add('drag-over'));
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));

    uploadZone.addEventListener('drop', (e) => {
        uploadZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileNameDisplay.innerText = files[0].name;
            analyzingFileText.innerText = files[0].name;
            uploadZone.style.borderColor = '#007bff';
        }
    });

    // 2. AI Analysis Logic (Modal Sequence)
    analyzeBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        fillBar.style.width = '0%';
        percentText.innerText = '0%';
        statusIcon.innerText = '●';
        statusIcon.style.color = '#ff934b';

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 8;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                finishAnalysis();
            }
            fillBar.style.width = `${progress}%`;
            percentText.innerText = `${Math.floor(progress)}%`;
        }, 150);
    });

    function finishAnalysis() {
        statusIcon.innerText = '✓';
        statusIcon.style.color = '#4cd137';
        
        setTimeout(() => {
            modal.style.display = 'none';
            // Auto-fill values for the demo
            titleInput.value = scenario.title;
            editor.innerText = scenario.content;
            
            // Update AI Sidebar
            summaryBox.innerHTML = scenario.summary;
            keywordsBox.innerHTML = scenario.keywords.map(k => `<span class="tag">${k}</span>`).join('');
            previewText.innerText = scenario.title;
        }, 800);
    }

    // 3. Card News Generation
    genBtn.addEventListener('click', () => {
        genBtn.innerHTML = `<span>⏳</span> 생성 중...`;
        setTimeout(() => {
            const themes = [
                'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600',
                'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600'
            ];
            cardBg.src = themes[Math.floor(Math.random() * themes.length)];
            genBtn.innerText = "🎨 카드뉴스 생성 완료";
            setTimeout(() => genBtn.innerText = "🎨 카드뉴스 생성 하기", 2000);
        }, 1500);
    });

    // 4. Download Mockup
    downloadBtn.addEventListener('click', () => {
        alert("현재 데모 버전에서는 이미지 준비 중입니다.\n실전 연동 시 캔버스 합성을 통해 다운로드가 수행됩니다.");
    });
});
