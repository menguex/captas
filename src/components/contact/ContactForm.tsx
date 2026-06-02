"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/content/services";
import { site } from "@/content/site";

const serviceOptions = [
  ...services.map((s) => ({
    value: s.id,
    label: s.pillar,
    short: s.short,
  })),
  {
    value: "full",
    label: "Integral",
    short: "Varios pilares en un solo proyecto",
  },
] as const;

const serviceLabels: Record<string, string> = {
  ...Object.fromEntries(services.map((s) => [s.id, s.title])),
  full: "Proyecto integral",
};

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  service: z.string().min(1, "Selecciona un servicio"),
  message: z.string().min(20, "Cuéntanos un poco más (mín. 20 caracteres)"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "" },
  });

  useEffect(() => {
    const servicio = searchParams.get("servicio");
    if (!servicio) return;

    const valid = serviceOptions.some((option) => option.value === servicio);
    if (valid) {
      setValue("service", servicio, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  const onSubmit = (data: FormData) => {
    const serviceLabel = serviceLabels[data.service] ?? data.service;
    const subject = encodeURIComponent(`Nuevo proyecto — ${data.name}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${data.name}`,
        `Email: ${data.email}`,
        `Empresa: ${data.company || "—"}`,
        `Servicio: ${serviceLabel}`,
        "",
        "Mensaje:",
        data.message,
      ].join("\n")
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative py-6 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
            <span className="text-xl text-sky" aria-hidden>
              ✓
            </span>
          </div>
          <p className="mt-6 font-heading text-h3 text-bone">Listo para enviar</p>
          <p className="mx-auto mt-3 max-w-sm text-body text-on-ink-muted">
            Se abrió tu correo con el mensaje preparado. Si no aparece, escríbenos a{" "}
            <a href={`mailto:${site.email}`} className="text-sky hover:underline">
              {site.email}
            </a>
          </p>
          <a href={`mailto:${site.email}`} className="gloss-button mt-8 inline-flex">
            Abrir email
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Nombre *" error={errors.name?.message}>
              <input
                {...register("name")}
                className="field-input"
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </Field>
            <Field label="Email *" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                className="field-input"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </Field>
          </div>

          <Field label="Empresa" error={errors.company?.message} optional>
            <input
              {...register("company")}
              className="field-input"
              placeholder="Nombre de tu empresa o marca"
              autoComplete="organization"
            />
          </Field>

          <div>
            <span
              id="service-picker-label"
              className="font-mono text-kicker uppercase tracking-[0.14em] text-fog"
            >
              Servicio de interés *
            </span>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <div
                  role="radiogroup"
                  aria-labelledby="service-picker-label"
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "service-picker-error" : undefined}
                  className="mt-3 grid gap-2 sm:grid-cols-2"
                >
                  {serviceOptions.map((option) => {
                    const selected = field.value === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(option.value)}
                        className={`rounded-box border px-4 py-3.5 text-left transition-all duration-base ${
                          selected
                            ? "border-accent bg-accent/15 shadow-[0_0_0_1px_rgba(61,85,108,0.28)]"
                            : "border-line bg-ink/50 hover:border-accent/30 hover:bg-ink/70"
                        }`}
                      >
                        <span
                          className={`font-mono text-[0.62rem] uppercase tracking-[0.12em] ${
                            selected ? "text-sky" : "text-fog"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span className="mt-1 block text-small leading-snug text-on-ink-muted">
                          {option.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.service?.message ? (
              <p id="service-picker-error" className="mt-2 font-mono text-[0.7rem] text-terra">
                {errors.service.message}
              </p>
            ) : null}
          </div>

          <Field label="Cuéntanos tu proyecto *" error={errors.message?.message}>
            <textarea
              {...register("message")}
              rows={6}
              className="field-input min-h-[9rem] resize-y"
              placeholder="¿Qué necesitas lograr? ¿Plazos? ¿Referencias o links?"
            />
          </Field>

          <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-on-ink-muted">
              Al enviar, se abrirá tu cliente de correo con el mensaje listo.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="gloss-button shrink-0 disabled:opacity-60"
            >
              Enviar mensaje
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-kicker uppercase tracking-[0.14em] text-fog">
        {label}
        {optional ? (
          <span className="ml-1 normal-case tracking-normal text-on-ink-muted">
            (opcional)
          </span>
        ) : null}
      </span>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-1.5 font-mono text-[0.7rem] text-terra">{error}</p>
      ) : null}
    </label>
  );
}
