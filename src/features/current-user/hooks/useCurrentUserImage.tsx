import { createClient } from "@/features/core/lib/supabase/client";
import { useEffect, useState } from "react";

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error("Error fetching user session for image:", error);
        return; // Exit early on error
      }

      // Ensure user_metadata exists and has avatar_url
      setImage(data.session?.user?.user_metadata?.avatar_url ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};
