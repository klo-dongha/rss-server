# rss-server

## 프로젝트 진행 이유

No-SQL에 대한 데이터를 쌓기 위해 여러 페이지에서 빅데이터 샘플을 다운로드 받아본 결과 생각보다 많지 않은 건수와 앞으로도 실용적이지 못한 데이터들이었다.  
때문에, 직접 뉴스에 대한 데이터를 쌓기로 결정

> **프로젝트 단계**

step1. RSS를 이용한 기초 데이터 불러오기  
step2. Elasticsearch 저장  
step3. Elasticsearch에 저장된 url을 통한 크롤링  
step4. Elasticsearch 저장  
step5. 원하는 자료 및 통계처리로 client 전송

> **[지원하지 않는 신문사 리스트]**

- RSS를 지원하지 않는 신문사 : OSEN, MBC
- 기존 RSS와 포멧이 다름 : KBS, KBS World RSS
- description 없음 : 한국경제 RSS
