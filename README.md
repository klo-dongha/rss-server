# 스케줄링을 통한 신문사 데이터 쌓기(with. node.js)

### 프로젝트 진행 이유

No-SQL에 대한 데이터를 쌓기 위해 여러 페이지에서 빅데이터 샘플을 다운로드를 받아본 결과 생각보다 많지 않은 건수와 앞으로도 실용적이지 못한 데이터들이었다.  
때문에 직접 신문사에서 RSS 데이터를 기반으로 뉴스에 전반적인 데이터를 쌓으며, RSS에서 제공한 링크를 통해 스크래핑하여 자세한 본문 데이터를 저장

## Version

node.js : v14.17.1

### 프로젝트 단계

step1. RSS를 이용한 기초 데이터 불러오기  
step2. Elasticsearch 저장  
step3. Elasticsearch에 저장된 url을 통한 크롤링  
step4. Elasticsearch 저장  
step5. 원하는 자료 및 통계처리로 client 전송

### 진행 예정

- description 입력시 html 태그 제거
- RSS에서 description을 요약본으로 주는 신문사들 스크래핑 후 데이터 저장
- node cron을 통한 스케줄링 또는 airflow 사용 고려
- 뉴스 수정 건에 대한 부분 고려
- 에러 로그 문서화 및 Elasticsearch 저장
- 기본 보안 설정 및 cors 설정 등
- swagger 설정

### 지원하지 않는 신문사 리스트

- RSS를 지원하지 않는 신문사 : OSEN, MBC, 일간스포츠, 이데일리, 아시아경제, 스포탈코리아, 스포츠서울, 서울신문, 서울경제, 블로터, 문화일보, 마이데일리, 데일리안, 뉴데일리, 경향신문
- 기존 RSS와 포멧이 다름 : KBS, KBS World
- description 없음 : 한국경제, 조선일보(대부분)
- 인코딩 문제 : 매일경제(rss version 0.91)
- url 및 dns 오류 : 머니투데이(스타일M), 디지털타임스
- 카테고리에
- ssl 인증서 문제 : 세계파이낸스

### 신문사 특징

- SBS : RSS를 통해 제공해줄 수 있는 데이터가 가장 모범적인 곳
- 한겨레 : description에 html 태그 포함
- 파이낸셜뉴스 : 스포츠, 패션/뷰티, 푸드·리빙, 자동차 rss 파싱 중 에러 발생
- 세계일보 : description 에 imgage tag 로 되어 있는 기사 존재
