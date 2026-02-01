<script setup lang="ts">
import SosCollabCard from "~/components/SosCollabCard.vue";
import Ajyal from "../../assets/webp/Ajyal.webp";
import Sos from "../../assets/webm/SOS-CDI-Collab.webm";
</script>
<template>
  <div class="p-4 bg-gradient-to-b to-green-dark">
    <UContainer class="!px-0 space-y-8">
      <div
        class="text-center text-3xl sm:text-5xl font-bold sm:pt-20 sm:pb-20 p-5 pb-10 pt-10"
      >
        Our
        <span class="text-green-default">Collaborations</span>
      </div>
      <AjyalCollabCard
        :image="Ajyal"
        date="February 2025"
        subtitle=" ExChange | During our visit to Ajyal El Houda we had the chance to
          introduce the digital world to the new generation."
        description="Seeing their curiosity and excitement about the digital world was truly inspiring!"
        headline="Roundtable Discussion"
        :points="[
          'Roundtable discussion to introduce students to the digital world fundamentals',
          'Interactive overview of various online domains and digital career paths',
          'Engaging Q&A session addressing students\' questions about digital literacy',
          'Introduction to basic concepts and terminology in the digital landscape',
        ]"
        quote="Introducing the digital world to these curious young minds creates pathways to future innovation and empowers the next generation of technologists."
        quoteAuthor="Club Digital & Innovation Team"
      >
        <template #title>
          CDI <span class="text-green-500">×</span> Institution AJYAL ALHOUDA
        </template>
      </AjyalCollabCard>
      <SosCollabCard
        :video="Sos"
        date="January 2025"
        subtitle="During our recent visit to the youth at SOS, we discussed the opportunities of the web, introduced some new concepts, and shared our experiences."
        description="It was a pleasure to see the interest in the eyes of the younger generation towards the digital world."
        headline="Key Initiatives
"
        :points="[
          'Introduction to web development fundamentals',
          'Career opportunities in the digital landscape',
          'Hands-on experience with basic coding concepts',
          'Mentorship and guidance for interested students',
        ]"
        quote="Empowering young people with digital knowledge opens doors to infinite possibilities for their future."
        quoteAuthor="CDI Outreach Team"
      >
        <template #title>
          CDI <span class="text-green-500">×</span> SOS Village
        </template>
      </SosCollabCard>
    </UContainer>
  </div>
</template>
