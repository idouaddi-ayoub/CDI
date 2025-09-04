<script setup lang="ts">
import { UContainer } from "#components";
import President from "../../assets/jpg/PlaceHolder.jpg";
import vicePresident from "../../assets/jpg/PlaceHolder.jpg";
import generalSecretary from "../../assets/jpg/PlaceHolder.jpg";
import humanResources from "../../assets/jpg/PlaceHolder.jpg";
import Treasurer from "../../assets/jpg/PlaceHolder.jpg";
import headOfCommunication from "../../assets/jpg/PlaceHolder.jpg";
import headOfDesign from "../../assets/jpg/PlaceHolder.jpg";
import headOfLogistics from "../../assets/jpg/PlaceHolder.jpg";
import Advisor from "../../assets/jpg/PlaceHolder.jpg";

const teamMembers = [
  {
    id: 0,
    title: "President",
    imageSrc: President,
  },
  {
    id: 1,
    title: "Vice President",
    imageSrc: vicePresident,
  },
  {
    id: 2,
    title: "General Secretary",
    imageSrc: generalSecretary,
  },
  {
    id: 3,
    title: "Human Resources",
    imageSrc: humanResources,
  },
  {
    id: 4,
    title: "Treasurer",
    imageSrc: Treasurer,
  },
  {
    id: 5,
    title: "Head of Communication",
    imageSrc: headOfCommunication,
  },
  {
    id: 6,
    title: "Head of Design",
    imageSrc: headOfDesign,
  },
  {
    id: 7,
    title: "Head of Logistics",
    imageSrc: headOfLogistics,
  },
  {
    id: 8,
    title: "Advisor",
    imageSrc: Advisor,
  },
];

const rowOne = computed(() => [teamMembers[0]!]);
const rowTwo = computed(() => teamMembers.slice(1, 5));
const rowThree = computed(() => teamMembers.slice(5, 9));

const rowTwoMobile = computed(() => teamMembers.slice(1, 3));
const rowThreeMobile = computed(() => teamMembers.slice(3, 5));
const rowFourMobile = computed(() => teamMembers.slice(5, 7));
const rowFiveMobile = computed(() => teamMembers.slice(7, 9));
</script>

<template>
  <div
    class="relative bg-gradient-to-b from-green-dark to-black flex justify-center items-center pt-10 pb-10"
  >
    <div class="text-center text-3xl sm:text-7xl font-bold sm:pt-10 sm:pb-10">
      Our
      <span class="text-green-default">Team</span>
      <p class="text-lg sm:text-2xl pt-5 font-light">
        <span class="md:block"> Learn, connect, and grow—through events </span>
        <span class="md:block"> shaped by our community. </span>
      </p>

      <UContainer
        class="hidden lg:flex flex-col items-center justify-center gap-8 pt-5"
      >
        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowOne"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>

        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowTwo"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>

        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowThree"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>
      </UContainer>

      <UContainer
        class="flex flex-col items-center justify-center gap-8 pt-5 lg:hidden px-0"
      >
        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowOne"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>
        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowTwoMobile"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>

        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowThreeMobile"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>

        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowFourMobile"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>
        <div class="flex flex-row gap-8">
          <TeamCard
            class="hover:z-10"
            v-for="member in rowFiveMobile"
            :key="member.id"
            :title="member.title"
            :imageSrc="member.imageSrc"
          />
        </div>
      </UContainer>
    </div>
  </div>
</template>
