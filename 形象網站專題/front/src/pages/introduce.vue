<template>
  <!-- Hero Pic -->
  <v-sheet>
    <v-img src="../assets/about us.jpg"></v-img>
  </v-sheet>
  <!-- Choir -->
  <v-container>
    <v-img src="../assets/about us.jpg" class="bg_img">
      <p class="text-center text-overlay">
        木樓合唱團為室內男聲合唱團，1999年成立至今秉持「男聲合唱藝術精緻化」的理念，透過追求完美的演唱，呈現深度藝術性的音樂內涵；透過歌者與聽眾間心靈感受的對話，傳達出音樂精緻的美感
      </p>
      <div class="btn-overlay">
        <DialogComponent title="關於我們">
          <!-- Timeline -->
          <template #content>
            <v-timeline align="start">
              <v-timeline-item
                v-for="(year, i) in years"
                :key="i"
                :dot-color="year.color"
                size="small"
              >
                <template v-slot:opposite>
                  <div
                    :class="`pt-1 headline font-weight-bold text-${year.color}`"
                    v-text="year.year"
                  ></div>
                </template>
                <div>
                  <h2
                    :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`"
                  >
                    Lorem ipsum
                  </h2>
                  <div>
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                    scaevola imperdiet nec ut, sed euismod convenire principes
                    at. Est et nobis iisque percipit, an vim zril disputando
                    voluptatibus, vix an salutandi sententiae.
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </template>
        </DialogComponent>
      </div>
    </v-img>
  </v-container>
  <!-- Conductor -->
  <v-container>
    <v-row>
      <v-col cols="6" class="text-center align-content-center"
        ><p>
          自2013年起擔任木樓合唱團藝術總監暨常任指揮至今，帶領該團於國際賽中連續獲得首獎殊榮；2015年彭孟賢帶領木樓合唱團榮獲《第九屆布拉姆斯國際合唱大賽暨音樂節》大賽總冠軍，2016年再度帶領木樓榮獲《第九屆世界合唱大賽冠軍賽》男聲室內合唱世界金牌總冠軍，木樓合唱團於德國國際文化交流基金會世界千大合唱團排名中，自2016年至2020年3月於室內合唱團項目連續四年蟬聯冠軍寶座。彭孟賢於藝術性、音樂能力、樂曲呈現整體性等方面獲得極高評價，國際評審曾讚譽：「瘋狂而驚人的指揮、令人崇敬的成就、迷人而撼動人心的音樂」。
        </p>
        <DialogComponent title="藝術總監暨指揮　彭孟賢">
          <template #content>
            現任臺灣合唱協會常任理事、德國國際文化交流基金會舉辦之國際合唱大賽評審、木樓合唱團藝術總監暨指揮、國立客家兒童合唱團團長暨指揮、臺北市教師合唱團藝術總監暨指揮、臺大EMBA合唱團藝術總監暨指揮、原聲國際學院合唱團藝術總監暨指揮、榮星青少年合唱團暨室內婦女合唱團音樂總監暨指揮、大愛之聲合唱團指揮、福建省藝術教育協會藝術顧問、美國合唱協會會員。2021年受邀擔任臺北市立交響樂團附設合唱團客席指揮。曾獲頒「特殊優良教師暨卓越獎」、「藝術教育貢獻獎」、「臺灣國際重唱藝術節暨創新合唱比賽─最佳指揮獎」。2020年獲頒「客家事務獎章」，並入選「2020臺灣客家名人錄」。
            近年連續受邀參與國際賽事及演出，並獲邀擔任國際評審，其足跡遍布西班牙、拉脫維亞、俄羅斯、德國、美國、新加坡、馬來西亞、中國等地，為臺灣合唱綻放異彩。
            　　自2013年起擔任木樓合唱團藝術總監暨常任指揮至今，帶領該團於國際賽中連續獲得首獎殊榮；2015年彭孟賢帶領木樓合唱團榮獲《第九屆布拉姆斯國際合唱大賽暨音樂節》大賽總冠軍，2016年再度帶領木樓榮獲《第九屆世界合唱大賽冠軍賽》男聲室內合唱世界金牌總冠軍，木樓合唱團於德國國際文化交流基金會世界千大合唱團排名中，自2016年至2020年3月於室內合唱團項目連續四年蟬聯冠軍寶座。彭孟賢於藝術性、音樂能力、樂曲呈現整體性等方面獲得極高評價，國際評審曾讚譽：「瘋狂而驚人的指揮、令人崇敬的成就、迷人而撼動人心的音樂」。
            　　2019年彭孟賢帶領木樓合唱團獲「美國合唱指揮協會」邀請於60週年年會演出兩場專場音樂會。2020年獲世界合唱大會邀請演出兩專場音樂會，從全世界44國179個合唱團隊脫穎而出，成為全球二十四個頂尖合唱團隊之一（因COVID-19疫情取消）。
            2016年起，彭孟賢受邀擔任國際評審與講師。2016年至2017年起受德國國際文化交流基金會邀請擔任《第五屆西班牙巴塞隆納國際合唱大賽》國際評審、《第三屆歐洲國際合唱大賽暨冠軍賽》舉辦於拉脫維亞擔任國際評審，2018年7月受台北愛樂文教基金會邀請擔任《第一屆臺北國際合唱大賽》國際評審。2018年至2020年間受客家委員會邀請擔任第一屆至第三屆《客家合唱比賽》評審。
            2017年至2020年間，連續受邀至中國福建、廈門等地，擔任第一至第三屆《海峽兩岸合唱教育大會》國際講師，教授專題講座〈發聲法〉〈排練技巧〉〈指揮法〉與〈合唱音樂詮釋〉，累計參加之指揮學員達上千人，並指揮木樓合唱團演出數場專場音樂會。2017年受湖南省音樂家協會合唱專業委員會邀請擔任《第四屆合唱藝術工作坊》駐營國際講師，中國各地共500名指揮學員前來研習。2018年10月再受德國國際文化交流基金會邀請於中國貴陽教授三日大師班與指揮講座《世界音樂—合唱指揮研討會議》，來自中國200名指揮進行研習。2019年臺灣合唱協會規劃桂冠合唱講堂中，彭孟賢於臺北與花蓮兩地以「聲彩繽紛的合唱世界：美聲合唱養成」為題進行演講。2019年11月指揮原聲國際學院合唱團於《第二十一屆中國上海國際藝術節》演出專場音樂會，12月帶領國立客家兒童合唱團於國家音樂廳演出連篇交響詩《臺灣客家369樂章》，2020年製作指揮國立客家兒童合唱團《情寄客家》創團專場音樂會，深耕推廣合唱文化教育與合唱藝術展演。
            　　彭孟賢在合唱藝術發展上有著理想，以其對合唱藝術的敏銳前瞻性，發展臺灣在地合唱，積極推廣臺灣合唱文化藝術，並接軌國際合唱及深耕臺灣合唱教育與精緻合唱藝術展演，將合唱文化影響力推深及廣。
          </template></DialogComponent
        ></v-col
      >
      <v-col cols="6">
        <v-img src="../assets/conductor.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
  <!-- Pianist -->
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img src="../assets/pianist.webp"></v-img>
      </v-col>
      <v-col cols="6" class="text-center align-content-center"
        ><p>
          自3歲開始學習鋼琴。師事謝秋月、林得恩、徐頌仁、諸大明等教授。曾受鋼琴家史蘭倩絲卡讚譽「擁有驚人的視譜能力，是位不可多得的伴奏家」。美國新英格蘭音樂院教授派翠希亞．桑德讚賞「其演奏令人印象深刻，是位有潛力、天賦異稟的鋼琴家」。現任教於多所音樂班，以及擔任台北愛樂歌劇坊、台北室內合唱團、木樓合唱團鋼琴合作。亦擁有個人專屬頻道，定期發表編創作品。
        </p>
        <DialogComponent title="鋼琴　王乃加">
          <template #content>
            自3歲開始學習鋼琴。師事謝秋月、林得恩、徐頌仁、諸大明等教授。曾受鋼琴家史蘭倩絲卡讚譽「擁有驚人的視譜能力，是位不可多得的伴奏家」。美國新英格蘭音樂院教授派翠希亞．桑德讚賞「其演奏令人印象深刻，是位有潛力、天賦異稟的鋼琴家」。現任教於多所音樂班，以及擔任台北愛樂歌劇坊、台北室內合唱團、木樓合唱團鋼琴合作。亦擁有個人專屬頻道，定期發表編創作品。
            　　近年來活躍於樂壇，累積豐富的演出經歷，多次受邀於巴赫音樂節、國際合唱音樂節演出。與台北愛樂歌劇坊演出《費加洛婚禮》、《法斯塔夫》、《喬凡尼先生》、《塞維爾的理髮師》、《愛情靈藥》、《弄臣》等多部歌劇，並演出近四十場《甘泉藝文沙龍音樂會》。與台北室內合唱團錄製〈大地之歌〉、〈謠唱島嶼〉、〈聽你．聽我〉、〈當代狂潮〉專輯，入圍及榮獲金曲獎。與木樓合唱團錄製〈文學與音樂的對話〉、〈木色Ⅱ〉、〈吹動島嶼的風〉〈木色Ⅲ愛的禮讚〉專輯。與天作之合劇團演出創團劇《天堂邊緣》。
            　　2019年11月與台北室內合唱團赴海南島演出。2017年9月與台北室內合唱團赴上海現代音樂節演出。3月和大提琴家張正傑赴印度演出。2015年與台北室內合唱團於香港演出。2012年與台北愛樂室內合唱團受邀至北京及西安等地演出。2009與台北室內合唱團於香港、日本演出。2007年受邀於湖南大學演出鋼琴獨奏。2001年入圍華信愛樂鋼琴菁英獎，接受古典愛樂電臺專訪。
          </template></DialogComponent
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script setup>
import DialogComponent from "@/components/dialog.vue";
const years = [
  {
    color: "cyan",
    year: "1960",
  },
  {
    color: "green",
    year: "1970",
  },
  {
    color: "pink",
    year: "1980",
  },
  {
    color: "amber",
    year: "1990",
  },
  {
    color: "orange",
    year: "2000",
  },
];
</script>

<style scoped>
.bg_img {
  opacity: 0.7; /* 使圖片半透明 */
  position: relative;
}
.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* 文字顏色 */
  text-shadow: 1px 1px 2px black; /* 文字陰影，讓文字更清晰 */
}
.btn-overlay {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
