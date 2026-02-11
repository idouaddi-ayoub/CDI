<script setup lang="ts"></script>
<template>
  <section
    id="about"
    aria-labelledby="about-heading"
    class="relative py-24 sm:py-32 bg-black"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-black via-green-950 to-black"
    />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
        <div>
          <UBadge
            color="success"
            variant="soft"
            class="mb-6 rounded-full px-4 py-1.5 text-sm font-semibold"
          >
            About the event
          </UBadge>

          <h2
            id="about-heading"
            class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            One day to ignite your
            <span class="text-green-500">next chapter</span>
          </h2>

          <p class="mt-6 text-lg text-gray-400 leading-relaxed">
            Eday Event 2026 brings together the brightest minds in tech, design,
            and entrepreneurship for a full day of learning, building, and
            connecting. Hosted at ENCG Casablanca, this is the premier
            student-driven tech event in Morocco.
          </p>

          <p class="mt-4 text-lg text-gray-400 leading-relaxed">
            Whether you're a student exploring career paths, a developer looking
            to level up, or a professional seeking fresh perspectives — Eday has
            something for you.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <FeatureCard
            title="Keynotes"
            description="Inspiring talks from top Airbnb hosts, real estate investors, and industry experts sharing actionable strategies."
            icon="uil:microphone"
          />

          <FeatureCard
            title="Workshops"
            description="Hands-on sessions where you'll learn practical skills for property management, short-term rentals, and real estate investing."
            icon="uil:wrench"
          />

          <FeatureCard
            title="Networking"
            description="Connect with fellow hosts, investors, and real estate professionals to grow your business and partnerships."
            icon="uil:users-alt"
          />

          <FeatureCard
            title="Insights & Trends"
            description="Discover the latest market trends, investment opportunities, and digital tools transforming Airbnb and real estate."
            icon="uil:chart-line"
          />
        </div>
      </div>
    </div>
  </section>
</template>
