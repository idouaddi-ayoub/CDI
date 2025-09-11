<script setup lang="ts">
import * as z from "zod";
import type { Database } from "../../../types/supabase";
import type { FormSubmitEvent } from "@nuxt/ui";
import canva from "../../assets/webp/canvapro.webp";
import chatgpt from "../../assets/webp/chatgpt-logo.webp";
import capcut from "../../assets/webp/capcut-logo-pc.webp";
import Perplexity from "../../assets/webp/Perplexity.webp";
import Gemini from "../../assets/webp/Gemini.webp";
import Tiktok from "../../assets/webp/Tiktok.webp";
import Netflix from "../../assets/webp/Netflix.webp";
import Spotify from "../../assets/webp/spotify.webp";
import CDI from "../../assets/webp/CDI_bg.webp";

const supabase = useSupabaseClient<Database>();

const schema = z.object({
  email: z.email("Invalid email address"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email } = event.data;

  try {
    const { error } = await supabase.from("Canva").insert({
      email,
    });

    if (error) {
      throw error;
    }

    toast.add({
      title: "Success",
      description: "Your message has been sent. The response will take a while",
      color: "success",
    });
  } catch (err: any) {
    toast.add({
      title: "Error",
      description: err.message,
      color: "error",
    });
    console.error(err);
  }
}

const showCard = ref(false);
const open = ref(false);

onMounted(() => {
  setTimeout(() => {
    showCard.value = true;
  }, 1000);
});
</script>
<template>
  <UContainer
    v-if="showCard"
    class="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-6 pb-10"
  >
    <div @click="open = true" class="cursor-pointer">
      <LazyDigitalCard title="Canva Pro" :image="canva">
        <template #description>
          <span class="line-through">20DH</span>
          <span class="text-green-600 font-bold text-3xl"> Free</span>
        </template>
      </LazyDigitalCard>
    </div>

    <UModal
      v-model:open="open"
      title="Get Canva Pro"
      description="Enter your email to get your free Canva Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="flex space-y-4 justify-between items-center"
          @submit="onSubmit"
        >
          <UFormField
            label="Email*"
            name="email"
            class="flex flex-col gap-2"
            :ui="{ label: 'text-sm font-medium' }"
          >
            <UInput
              v-model="state.email"
              placeholder="Type your Email"
              class="w-full"
            />
          </UFormField>
          <UButton
            class="flex h-fit items-center justify-center"
            type="submit"
            label="Submit"
          />
        </UForm>
      </template>
    </UModal>
    <LazyDigitalCard
      title="CapCut Pro"
      description="Coming Soon..."
      :image="capcut"
      disabled
    />
    <LazyDigitalCard
      title="ChatGPT Pro"
      description="Coming Soon..."
      :image="chatgpt"
      disabled
    /><LazyDigitalCard
      title="Perplixity pro"
      description="Coming Soon..."
      :image="Perplexity"
      disabled
    /><LazyDigitalCard
      title="Gemini Pro"
      description="Coming Soon..."
      :image="Gemini"
      disabled
    /><LazyDigitalCard
      title="Tiktok Beta"
      description="Coming Soon..."
      :image="Tiktok"
      disabled
    /><LazyDigitalCard
      title="Netflix"
      description="Coming Soon..."
      :image="Netflix"
      disabled
    /><LazyDigitalCard
      title="Spotify"
      description="Coming Soon..."
      :image="Spotify"
      disabled
    /><LazyDigitalCard
      title="More soon"
      description="Coming Soon..."
      :image="CDI"
      disabled
    />
  </UContainer>
</template>
