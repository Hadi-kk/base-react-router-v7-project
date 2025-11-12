import { QueryClient } from "@tanstack/react-query";
import { Link, data } from "react-router";
import type { Route } from "./+types/character.$id";
import { Client } from "~/lib/client";

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient();

  try {
    const characterData = await queryClient.fetchQuery(
      Client.getCharacter({ id: params.id })
    );

    if (!characterData?.character) {
      throw data("Character not found", { status: 404 });
    }

    return { character: characterData.character };
  } catch (error) {
    throw data("Failed to load character", { status: 500 });
  }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.character) {
    return [
      { title: "Character Not Found | Rick and Morty" },
      { name: "description", content: "Character not found" },
    ];
  }

  const { character } = data;
  const episodeCount = character.episode?.length || 0;
  const description = `${character.name} - ${character.status} ${character.species} from ${character.origin?.name}. Appeared in ${episodeCount} episode${episodeCount !== 1 ? "s" : ""}.`;

  return [
    { title: `${character.name} | Rick and Morty` },
    { name: "description", content: description },
    { property: "og:title", content: `${character.name} | Rick and Morty` },
    { property: "og:description", content: description },
    { property: "og:image", content: character.image || "" },
    { property: "og:type", content: "profile" },
  ];
}

export default function CharacterDetail({ loaderData }: Route.ComponentProps) {
  const { character } = loaderData;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to Search
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                src={character.image || ""}
                alt={character.name || "Character"}
                className="h-full w-full object-cover md:w-80"
              />
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {character.name}
              </h1>

              <div className="space-y-3">
                <InfoRow label="Status" value={character.status} />
                <InfoRow label="Species" value={character.species} />
                {character.type && (
                  <InfoRow label="Type" value={character.type} />
                )}
                <InfoRow label="Gender" value={character.gender} />
                <InfoRow label="Origin" value={character.origin?.name} />
                <InfoRow label="Location" value={character.location?.name} />
              </div>
            </div>
          </div>

          {character.episode && character.episode.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Episodes ({character.episode.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {character.episode.map((episode) => (
                  <div
                    key={episode?.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {episode?.episode}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {episode?.name}
                    </p>
                    {episode?.air_date && (
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {episode.air_date}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex">
      <span className="font-semibold text-gray-700 dark:text-gray-300 w-24">
        {label}:
      </span>
      <span className="text-gray-900 dark:text-white">
        {value || "Unknown"}
      </span>
    </div>
  );
}
