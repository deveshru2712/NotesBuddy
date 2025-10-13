import { ProviderLogos } from "@/components/ui/provider-logo";

type Props = {
  provider: string;
};

export const ModelLogo = (props: Props) => {
  const { provider } = props;
  return (
    <div>
      {(() => {
        const providerKey = provider as keyof typeof ProviderLogos;
        const Logo = ProviderLogos[providerKey];
        return Logo ? (
          Logo(16)
        ) : (
          <>
            <span className="text-lg font-bold">NotesBuddy</span>
          </>
        );
      })()}
    </div>
  );
};
