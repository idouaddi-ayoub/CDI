<script setup lang="ts"></script>
<template>
  <section
    aria-labelledby="why-heading"
    class="relative py-24 sm:py-32 bg-gradient-to-b from-black to-green-950"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <UBadge
          color="success"
          variant="soft"
          class="mb-6 rounded-full px-4 py-1.5 text-sm font-semibold"
        >
          Why attend
        </UBadge>

        <h2
          id="why-heading"
          class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
        >
          Your career deserves
          <span class="text-green-500">this day</span>
        </h2>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <WhyCard
          title="Learn from the best"
          description="Speakers and practitioners share cutting-edge insights on Aibnb, product, design, and careers."
          icon="uil:lightbulb-alt"
        />

        <WhyCard
          title="Expand your network"
          description="Meet future co-founders, mentors, and collaborators in a curated environment designed for meaningful connections."
          icon="uil:rss"
        />

        <WhyCard
          title="Build real projects"
          description="Walk away with tangible skills. Our workshops are project-based — you ship something before you leave."
          icon="uil:rocket"
        />

        <WhyCard
          title="Gain Real Insights"
          description="Learn actionable strategies from experienced hosts, investors, and real estate experts to grow your business."
          icon="uil:book-open"
        />
      </div>
    </div>
  </section>
</template>
