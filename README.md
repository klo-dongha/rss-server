# rss-server

### 프로젝트 진행 이유

No-SQL에 대한 데이터를 쌓기 위해 여러 페이지에서 빅데이터 샘플을 다운로드를 받아본 결과 생각보다 많지 않은 건수와 앞으로도 실용적이지 못한 데이터들이었다.  
때문에 직접 신문사에서 RSS 데이터를 기반으로 뉴스에 전반적인 데이터를 쌓으며, RSS에서 제공한 링크를 통해 스크래핑하여 자세한 본문 데이터를 저장

> **프로젝트 단계**

step1. RSS를 이용한 기초 데이터 불러오기  
step2. Elasticsearch 저장  
step3. Elasticsearch에 저장된 url을 통한 크롤링  
step4. Elasticsearch 저장  
step5. 원하는 자료 및 통계처리로 client 전송

> **진행 예정**

- description 입력시 html 태그 제거
- RSS에서 description을 요약본으로 주는 신문사들 스크래핑 후 데이터 저장
- node cron을 통한 스케줄링 또는 airflow 사용 고려
- 뉴스 수정 건에 대한 부분 고려

> **지원하지 않는 신문사 리스트**

- RSS를 지원하지 않는 신문사 : OSEN, MBC
- 기존 RSS와 포멧이 다름 : KBS, KBS World
- description 없음 : 한국경제

> **신문사 특징**

- SBS : RSS를 통해 제공해줄 수 있는 데이터가 가장 모범적인 곳
- 한겨레 : description에 html 태그 포함
