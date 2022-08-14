## Info

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">  <img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white"> <img src="https://img.shields.io/badge/Recoil-303846?style=for-the-badge&logo=Recoil&logoColor=white">  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white">  <img src="https://img.shields.io/badge/Formik-F9FAFB?style=for-the-badge&logo=Formik&logoColor=white"> <img src="https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge&logo=Nodemailer&logoColor=white">

- `주소` https://next-dayrecorder.vercel.app/  
 
- `제작 기간` 2022.03.07 ~ 2022.04.23 

## 소개
dayrecorder 는 시간을 기록하는 도구입니다.

## 주요 기능 
- [회원가입](##회원가입)
- [인증(이메일/핸드폰)](##인증(이메일/핸드폰))
- [캘린더](##캘린더)
- [레코드](##레코드)
- [타이머](##타이머)
- [통계](##통계)

## 회원가입 
![dayrecorder_register](https://user-images.githubusercontent.com/81809559/184519776-66713091-de18-4701-9407-9fc6b3e24b35.gif)

`Yup` 과 `Formik` 라이브러리를 이용하여 유효성 검사를 구현하였고  
이메일 발송은 `nodemailer` 를 사용하였습니다.

## 인증

- 이메일로 비밀번호 찾기  

![dayrecorder_auth](https://user-images.githubusercontent.com/81809559/184520108-368972ff-88b1-4133-a038-53dcd90022ac.gif)

- 핸드폰 번호 추가하기  

![dayrecorder_phone](https://user-images.githubusercontent.com/81809559/184520811-d39ae64c-46e8-45f1-8de3-4d3a6d44e365.gif)

- 핸드폰 번호로 비밀번호 찾기  

![dayrecorder_phone_pw](https://user-images.githubusercontent.com/81809559/184520865-4fbf42b6-9ea0-4299-8382-793ea6c3c817.gif)

사용자 입력값을 정규식으로 검사해서 이메일인지 휴대폰 번호인지 둘 다 아닌지 판별해서 둘 다 아닌 경우를 제외하고 DB 에서 조회하였습니다.  
sms 문자 발송은 `twilio` 를 사용하였습니다.

## 캘린더
![image](https://user-images.githubusercontent.com/81809559/184520995-11d3b234-a8e2-4454-8317-5689607cae07.png)

라이브러리를 사용하지 않고 직접 구현해보았습니다.
utils/date.js 에 윤년 체크하는 함수 `isLeapYear` 와 현재 연월의 일자를 빈칸 포함해서 배열로 리턴하는 함수 `daysOfMonth` 를 만들고, 리턴받은 배열을 map 돌면서 grid 로 한 줄에 7개씩 렌더하였습니다.

## 레코드
![dayrecorder_record](https://user-images.githubusercontent.com/81809559/184523872-ce78829d-c302-477e-8e28-86b4fa95b489.gif)

**현재 시각 구하기**

utils/timeUtil.js 에 현재 시각을 "00:00" 형식으로 리턴하는 함수 `getCurrentTime` 을 정의하고 
그것의 리턴값을 기본값으로 갖는 전역 상태 `currentTime` 과,
`currentTime` 이 변경됨에 따라 분침 위치를 리턴하는 `minutehandPosition` 셀렉터를 만들었습니다.

그리고 현재 시각으로부터 1분 뒤가 아니라 실제 시각의 분 단위가 변경됐을 때 `currentTime` 를 변경하기 위해서 `useMinutehand` 훅에서 60 * 1000 - 훅이 호출된 시점의 시각을 `remaining` 변수에 할당 후,
remaining 후에 `currentTime` 전역 상태를 getCurrentTime() 으로 변경하는 setTimeout 을 등록했습니다. 

`currentTime` 이 변경되면 자동으로 `minutehandPosition` 셀렉터가 실행되고, 분침의 위치는 store/constants 에 `ONE_MINUTE_HEIGHT` 상수를 만들고 3을 할당해서 1분의 간격을 3px로 정한 뒤, utils/time.js 에서 현재 시각을 인자로 받아 분 단위로 바꾸고나서 `ONE_MINUTE_HEIGHT` 를 곱하여 리턴하는 함수 `getMinutehandPos` 를 통해 구했습니다.

**레코드 등록**

레코드 버튼을 누르면 `RecordCreateModal` 컴포넌트가 열리고, 입력 후 엔터를 누르면 제목과 색상 정보를 `uesRecorder` 훅이 리턴하는 `startRecording` 함수에 넘깁니다. 
해당 함수에서 시작 시각 (getCurrentTime 의 리턴값) 을 비롯해서 필요한 정보들을 로컬 스토리지에 저장하고 (새로고침이나 재렌더 시 데이터 소실되지 않기 위해), stop 버튼이 눌리면 `stopRecording` 함수에서 데이터베이스에 새로운 레코드 정보를 등록합니다.

그리고 `recordsData` 아톰 패밀리에서 레코드 정보를 패치하고 `Table` 컴포넌트에서 `useRecoilStateLoadable` 로 받아온 뒤 map 을 돌면서 각 레코드 정보를 `Record` 컴포넌트에 넘겼습니다.
해당 컴포넌트에서 레코드 정보 중 시작 시각 `start` 에 `ONE_MINUTE_HEIGHT` 를 곱한 값을 absolute div의 top 값으로 줬고, 레코드의 길이는 (종료 시각 - 현재 시각) * `ONE_MINUTE_HEIGHT` 의 결과값입니다. 


## 타이머 (WebGL)
![dayrecorder_timer](https://user-images.githubusercontent.com/81809559/184523420-1dbc223a-7763-463b-9093-a5869347628e.gif)

`Timer` 컴포넌트에서 `min` 상태를 선언하고 타이머 시작 버튼이 눌러지면 1분마다 로컬 스토리지에 경과 시간 업데이트 및 `min` 상태값을 변경해주는 interval 을 등록한 뒤, `lib/timer.js` 에 Clock 클래스를 만들고 현재 경과된 `min` 과 `ctx` 를 인자로 받아서 `min` 값에 따라 호를 그리는 `drawArc` 메소드를 정의했습니다.

`Timer` 컴포넌트에서 타이머를 안보이게 접을수도 있고 펼칠수도 있는데 펼쳐지게 되면 `TimerBody` 컴포넌트에 `min` 을 넘겨서 렌더했고, 여기서 Clock 클래스의 인스턴스를 생성했습니다.
그런 다음 `drawArc` 메소드에 min 과 ctx 를 넘겨줘야하는데, ctx 는 `useCanvas` 훅에서 생성했습니다. 
이 훅은 캔버스의 너비와 높이, 그리고 콜백을 받아서 ctx를 생성하고 콜백에 ctx를 넘겨서 실행시킨 뒤 ref 를 리턴합니다. 

따라서 ctx를 인자로 받아서 `drawArc` 메소드에 `min` 과 `ctx` 를 넘겨주는 `drawClock` 메소드를 정의하고 useCanvas 훅에 넘겨서 실행했습니다.

`min` 이 목표 시간과 동일해지면 interval 을 종료하고 레코드를 등록했습니다.

타이머는 todo 페이지에 있는 버튼으로도 동작시킬 수 있기 때문에 타이머 시작 정지 상태를 전역 상태로 만들었습니다.

(위 gif 는 타이머가 완료됐을 때 동작을 보여주기 위해서 임의로 `min` 이 500ms마다 업데이트되도록 잠깐 수정해놓고 캡쳐했습니다)  

## 통계 
![dayrecorder_statistics](https://user-images.githubusercontent.com/81809559/184527358-fabd9bae-292a-4b03-9820-0b8960936e39.gif)

`@nivo/bar` 라이브러리를 사용해서 구현하였습니다.
