import { ProviderLogos } from "@/components/ui/provider-logo";
import { RobotIcon } from "@phosphor-icons/react";

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
          <RobotIcon className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
        );
      })()}
    </div>
  );
};
